/**
 * Git worktree management for plan comparisons.
 *
 * Creates temporary worktrees in /tmp for running AI planners in
 * isolated environments, copies untracked .sum files, and handles
 * cleanup on success or abort.
 *
 * @module
 */

import { simpleGit } from 'simple-git';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import fg from 'fast-glob';

/**
 * Result of creating the worktree pair.
 */
export interface WorktreePair {
  /** Path to the "with-docs" worktree */
  withDocsPath: string;
  /** Path to the "without-docs" worktree */
  withoutDocsPath: string;
  /** Branch name for "with-docs" */
  withDocsBranch: string;
  /** Branch name for "without-docs" */
  withoutDocsBranch: string;
  /** Cleanup function to remove worktrees */
  cleanup: () => Promise<void>;
}

/**
 * Check if a git branch exists.
 */
async function branchExists(projectRoot: string, branchName: string): Promise<boolean> {
  const git = simpleGit(projectRoot);
  try {
    await git.raw(['rev-parse', '--verify', branchName]);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check for uncommitted changes and warn the user.
 *
 * @returns true if there are uncommitted changes
 */
export async function hasUncommittedChanges(projectRoot: string): Promise<boolean> {
  const git = simpleGit(projectRoot);
  const status = await git.status();
  return status.modified.length > 0 || status.not_added.length > 0 ||
    status.staged.length > 0 || status.deleted.length > 0;
}

/**
 * Remove any existing worktrees that reference the given branches.
 *
 * Parses `git worktree list --porcelain` to find worktree paths by branch,
 * then force-removes them so the branches can be safely deleted.
 */
async function removeWorktreesForBranches(projectRoot: string, branches: string[]): Promise<void> {
  const git = simpleGit(projectRoot);
  const output = await git.raw(['worktree', 'list', '--porcelain']);

  // Parse porcelain output: blocks separated by blank lines,
  // each block has "worktree <path>" and "branch refs/heads/<name>"
  let currentPath: string | null = null;
  for (const line of output.split('\n')) {
    if (line.startsWith('worktree ')) {
      currentPath = line.slice('worktree '.length);
    } else if (line.startsWith('branch refs/heads/') && currentPath) {
      const branch = line.slice('branch refs/heads/'.length);
      if (branches.includes(branch)) {
        try {
          await git.raw(['worktree', 'remove', '--force', currentPath]);
        } catch {
          // Worktree may already be gone
        }
      }
    } else if (line.trim() === '') {
      currentPath = null;
    }
  }
}

/**
 * Copy untracked .sum files from the project root to the worktree.
 *
 * .sum files are gitignored, so they won't appear in worktrees by default.
 * This copies them to the "with-docs" worktree so the AI planner can see them.
 */
async function copySumFiles(projectRoot: string, worktreePath: string): Promise<number> {
  const sumFiles = await fg.glob('**/*.sum', {
    cwd: projectRoot,
    onlyFiles: true,
    dot: true,
    ignore: ['**/node_modules/**', '**/.git/**'],
  });

  for (const file of sumFiles) {
    const src = path.join(projectRoot, file);
    const dest = path.join(worktreePath, file);
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(src, dest);
  }

  return sumFiles.length;
}

/**
 * Create a pair of git worktrees for plan comparison.
 *
 * Creates named branches from HEAD and temporary worktrees in /tmp.
 * The "with-docs" worktree gets .sum files copied in.
 *
 * @param projectRoot - The project root directory
 * @param taskSlug - Slugified task name for branch naming
 * @param force - Whether to overwrite existing branches
 * @returns WorktreePair with paths, branch names, and cleanup function
 * @throws If branches already exist and force is false
 */
export async function createWorktreePair(
  projectRoot: string,
  taskSlug: string,
  force: boolean,
): Promise<WorktreePair> {
  const git = simpleGit(projectRoot);

  const withDocsBranch = `are/plan/with-docs/${taskSlug}`;
  const withoutDocsBranch = `are/plan/without-docs/${taskSlug}`;

  // Check for existing branches
  const withDocsExists = await branchExists(projectRoot, withDocsBranch);
  const withoutDocsExists = await branchExists(projectRoot, withoutDocsBranch);

  if ((withDocsExists || withoutDocsExists) && !force) {
    throw new Error(
      `Branches already exist for this task:\n` +
      `  ${withDocsBranch}\n` +
      `  ${withoutDocsBranch}\n` +
      `Use --force to overwrite.`,
    );
  }

  // Remove any existing worktrees referencing these branches before deleting
  if (withDocsExists || withoutDocsExists) {
    await removeWorktreesForBranches(projectRoot, [withDocsBranch, withoutDocsBranch]);
  }
  if (withDocsExists) {
    await git.raw(['branch', '-D', withDocsBranch]);
  }
  if (withoutDocsExists) {
    await git.raw(['branch', '-D', withoutDocsBranch]);
  }

  // Create named branches from HEAD
  await git.raw(['branch', withDocsBranch, 'HEAD']);
  await git.raw(['branch', withoutDocsBranch, 'HEAD']);

  // Create temporary worktree base directory
  const tmpId = randomBytes(6).toString('hex');
  const tmpBase = path.join(tmpdir(), `are-plan-${tmpId}`);
  const withDocsPath = path.join(tmpBase, 'with-docs');
  const withoutDocsPath = path.join(tmpBase, 'without-docs');

  // Create worktrees
  await git.raw(['worktree', 'add', withDocsPath, withDocsBranch]);
  await git.raw(['worktree', 'add', withoutDocsPath, withoutDocsBranch]);

  // Copy .sum files to the "with-docs" worktree
  await copySumFiles(projectRoot, withDocsPath);

  // Build cleanup function
  const cleanup = async () => {
    const cleanupGit = simpleGit(projectRoot);
    try {
      await cleanupGit.raw(['worktree', 'remove', '--force', withDocsPath]);
    } catch {
      // Worktree may already be removed
    }
    try {
      await cleanupGit.raw(['worktree', 'remove', '--force', withoutDocsPath]);
    } catch {
      // Worktree may already be removed
    }
  };

  return {
    withDocsPath,
    withoutDocsPath,
    withDocsBranch,
    withoutDocsBranch,
    cleanup,
  };
}

/**
 * Commit a PLAN.md file to a worktree branch.
 *
 * Writes the plan text as `.agents-reverse-engineer/plans/<id>/PLAN.md`
 * in the worktree and commits it, so the plan is preserved on the branch
 * after the worktree is removed. This allows `are implement` to read the
 * plan directly from the branch without needing local disk storage.
 *
 * @param worktreePath - Absolute path to the worktree
 * @param planText - The plan markdown content
 * @param comparisonId - The comparison ID (timestamp-based) for the plan directory
 */
export async function commitPlanToWorktree(
  worktreePath: string,
  planText: string,
  comparisonId: string,
): Promise<void> {
  const planDir = path.join(worktreePath, '.agents-reverse-engineer', 'plans', comparisonId);
  await mkdir(planDir, { recursive: true });
  const planPath = path.join(planDir, 'PLAN.md');
  await writeFile(planPath, planText, 'utf-8');
  const git = simpleGit(worktreePath);
  await git.add(planPath);
  await git.commit('chore(are-plan): save generated plan');
}

/**
 * Create worktrees from existing branches without recreating them.
 *
 * Used by `are implement` to attach to branches created by `are plan`,
 * preserving any commits (e.g. PLAN.md) already on those branches.
 *
 * @param projectRoot - The project root directory
 * @param taskSlug - Slugified task name for branch naming
 * @returns WorktreePair with paths, branch names, and cleanup function
 * @throws If branches do not exist
 */
export async function reuseWorktreePair(
  projectRoot: string,
  taskSlug: string,
): Promise<WorktreePair> {
  const git = simpleGit(projectRoot);

  const withDocsBranch = `are/plan/with-docs/${taskSlug}`;
  const withoutDocsBranch = `are/plan/without-docs/${taskSlug}`;

  // Verify both branches exist
  const withDocsExists = await branchExists(projectRoot, withDocsBranch);
  const withoutDocsExists = await branchExists(projectRoot, withoutDocsBranch);

  if (!withDocsExists || !withoutDocsExists) {
    throw new Error(
      `Plan branches not found for task slug "${taskSlug}".\n` +
      `  Expected: ${withDocsBranch}\n` +
      `  Expected: ${withoutDocsBranch}\n` +
      `Run \`are plan "<task>"\` first to create them.`,
    );
  }

  // Remove any stale worktrees referencing these branches
  await removeWorktreesForBranches(projectRoot, [withDocsBranch, withoutDocsBranch]);

  // Create temporary worktree base directory
  const tmpId = randomBytes(6).toString('hex');
  const tmpBase = path.join(tmpdir(), `are-impl-${tmpId}`);
  const withDocsPath = path.join(tmpBase, 'with-docs');
  const withoutDocsPath = path.join(tmpBase, 'without-docs');

  // Create worktrees from existing branches (preserving commits)
  await git.raw(['worktree', 'add', withDocsPath, withDocsBranch]);
  await git.raw(['worktree', 'add', withoutDocsPath, withoutDocsBranch]);

  // Build cleanup function
  const cleanup = async () => {
    const cleanupGit = simpleGit(projectRoot);
    try {
      await cleanupGit.raw(['worktree', 'remove', '--force', withDocsPath]);
    } catch {
      // Worktree may already be removed
    }
    try {
      await cleanupGit.raw(['worktree', 'remove', '--force', withoutDocsPath]);
    } catch {
      // Worktree may already be removed
    }
  };

  return {
    withDocsPath,
    withoutDocsPath,
    withDocsBranch,
    withoutDocsBranch,
    cleanup,
  };
}

/**
 * Read a PLAN.md file from a worktree's `.agents-reverse-engineer/plans/` directory.
 *
 * Searches for the plan by comparison ID, or finds the first available plan
 * directory if no ID is given.
 *
 * @param worktreePath - Absolute path to the worktree
 * @param comparisonId - Optional comparison ID; if omitted, finds the first plan
 * @returns The plan markdown text, or null if not found
 */
export async function readPlanFromWorktree(
  worktreePath: string,
  comparisonId?: string,
): Promise<string | null> {
  const plansBase = path.join(worktreePath, '.agents-reverse-engineer', 'plans');

  if (comparisonId) {
    try {
      return await readFile(path.join(plansBase, comparisonId, 'PLAN.md'), 'utf-8');
    } catch {
      return null;
    }
  }

  // No ID given — find first plan directory
  try {
    const entries = await fg.glob('*/PLAN.md', { cwd: plansBase, onlyFiles: true });
    if (entries.length > 0) {
      // Sort descending to get newest first
      entries.sort().reverse();
      return await readFile(path.join(plansBase, entries[0]), 'utf-8');
    }
  } catch {
    // Directory may not exist
  }

  return null;
}
