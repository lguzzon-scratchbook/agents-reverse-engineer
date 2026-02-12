import type { ChangeDetectionResult, ChangeDetectionOptions } from './types.js';
/**
 * Check if a path is inside a git repository.
 */
export declare function isGitRepo(projectRoot: string): Promise<boolean>;
/**
 * Get the current HEAD commit hash.
 */
export declare function getCurrentCommit(projectRoot: string): Promise<string>;
/**
 * Detect files changed since a base commit.
 *
 * Uses git diff with --name-status and -M for rename detection.
 * Optionally includes uncommitted changes (staged + working directory).
 */
export declare function getChangedFiles(projectRoot: string, baseCommit: string, options?: ChangeDetectionOptions): Promise<ChangeDetectionResult>;
/**
 * Compute SHA-256 hash of a file's content.
 *
 * @param filePath - Absolute path to the file
 * @returns Hex-encoded SHA-256 hash
 */
export declare function computeContentHash(filePath: string): Promise<string>;
/**
 * Compute SHA-256 hash from an already-loaded string.
 *
 * Use this when the file content is already in memory to avoid
 * a redundant disk read.
 *
 * @param content - The file content as a string
 * @returns Hex-encoded SHA-256 hash
 */
export declare function computeContentHashFromString(content: string): string;
//# sourceMappingURL=detector.d.ts.map