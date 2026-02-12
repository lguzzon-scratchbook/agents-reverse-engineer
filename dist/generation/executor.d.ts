/**
 * Plan executor for documentation generation
 *
 * Builds execution plans from generation plans:
 * - File tasks as individual analysis jobs
 * - Directory completion tracking
 * - Markdown plan output for dry-run display
 */
import type { GenerationPlan } from '../orchestration/orchestrator.js';
/**
 * Execution task ready for AI processing.
 */
export interface ExecutionTask {
    /** Unique task ID */
    id: string;
    /** Task type */
    type: 'file' | 'directory';
    /** File or directory path (relative) */
    path: string;
    /** Absolute path */
    absolutePath: string;
    /** System prompt for AI */
    systemPrompt: string;
    /** User prompt for AI */
    userPrompt: string;
    /** Dependencies (task IDs that must complete first) */
    dependencies: string[];
    /** Output path for generated content */
    outputPath: string;
    /** Metadata for tracking */
    metadata: {
        directoryFiles?: string[];
        /** Directory depth (for post-order traversal) */
        depth?: number;
        /** Package root path (for supplementary docs) */
        packageRoot?: string;
    };
}
/**
 * Execution plan with dependency graph.
 */
export interface ExecutionPlan {
    /** Project root */
    projectRoot: string;
    /** All tasks in execution order */
    tasks: ExecutionTask[];
    /** File tasks (can run in parallel) */
    fileTasks: ExecutionTask[];
    /** Directory tasks (depend on file tasks) */
    directoryTasks: ExecutionTask[];
    /** Directory to file mapping */
    directoryFileMap: Record<string, string[]>;
    /** Compact project directory listing for directory prompt context */
    projectStructure?: string;
    /** Files skipped due to existing .sum artifacts */
    skippedFiles?: string[];
    /** Directories skipped due to existing AGENTS.md */
    skippedDirs?: string[];
}
/**
 * Build execution plan from generation plan.
 *
 * Directory tasks are sorted using post-order traversal (deepest directories first)
 * so child AGENTS.md files are generated before their parents.
 */
export declare function buildExecutionPlan(plan: GenerationPlan, projectRoot: string): ExecutionPlan;
/**
 * Check if all files in a directory have been analyzed (.sum files exist).
 */
export declare function isDirectoryComplete(dirPath: string, expectedFiles: string[], projectRoot: string): Promise<{
    complete: boolean;
    missing: string[];
}>;
/**
 * Get all directories that are ready for AGENTS.md generation.
 * A directory is ready when all its files have .sum files.
 */
export declare function getReadyDirectories(executionPlan: ExecutionPlan): Promise<string[]>;
/**
 * Format execution plan as markdown for GENERATION-PLAN.md.
 * Uses post-order traversal (deepest directories first).
 */
export declare function formatExecutionPlanAsMarkdown(plan: ExecutionPlan): string;
//# sourceMappingURL=executor.d.ts.map