import type { FileChange } from '../change-detection/types.js';
import type { CleanupResult } from './types.js';
/**
 * Clean up orphaned .sum files and empty AGENTS.md files.
 *
 * @param projectRoot - Absolute path to project root
 * @param changes - List of file changes (deleted and renamed files need cleanup)
 * @param dryRun - If true, don't actually delete files
 * @returns Cleanup result with lists of deleted files
 */
export declare function cleanupOrphans(projectRoot: string, changes: FileChange[], dryRun?: boolean): Promise<CleanupResult>;
/**
 * Check if a directory has any source files remaining.
 * If not, delete its AGENTS.md.
 *
 * @param dirPath - Absolute path to directory
 * @param dryRun - If true, don't actually delete
 * @returns true if AGENTS.md was deleted
 */
export declare function cleanupEmptyDirectoryDocs(dirPath: string, dryRun?: boolean): Promise<boolean>;
/**
 * Get list of directories that should have their AGENTS.md regenerated.
 *
 * Includes parent directories of changed files up to project root.
 *
 * @param changes - List of file changes (non-deleted files)
 * @returns Set of relative directory paths
 */
export declare function getAffectedDirectories(changes: FileChange[]): Set<string>;
//# sourceMappingURL=orphan-cleaner.d.ts.map