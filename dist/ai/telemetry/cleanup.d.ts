/**
 * Telemetry log cleanup utility.
 *
 * Removes old run log files from `.agents-reverse-engineer/logs/`,
 * keeping only the N most recent. Files are sorted lexicographically
 * by name, which works correctly because filenames contain ISO timestamps.
 *
 * @module
 */
/**
 * Remove old telemetry log files, keeping only the most recent ones.
 *
 * Reads the logs directory, filters for files matching `run-*.json`,
 * sorts newest-first (lexicographic sort on ISO timestamp filenames),
 * and deletes everything beyond `keepCount`.
 *
 * If the logs directory does not exist, returns 0 without error.
 *
 * @param projectRoot - Absolute path to the project root directory
 * @param keepCount - Number of most recent log files to retain
 * @returns Number of files deleted
 *
 * @example
 * ```typescript
 * const deleted = await cleanupOldLogs('/home/user/project', 10);
 * console.log(`Cleaned up ${deleted} old log files`);
 * ```
 */
export declare function cleanupOldLogs(projectRoot: string, keepCount: number): Promise<number>;
//# sourceMappingURL=cleanup.d.ts.map