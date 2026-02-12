/**
 * Streaming build-log progress reporter with ETA calculation.
 *
 * Outputs one line per event (start, done, fail, dir-done)
 * using `console.log` for atomic, non-corrupting concurrent output.
 * Each line shows progress counter, status, file path, timing, and
 * token counts using colored output via `picocolors`.
 *
 * ETA is computed via a moving average of the last 10 completion times,
 * displayed after 2 or more files have completed.
 *
 * Optionally mirrors all output to a plain-text progress log file
 * (`.agents-reverse-engineer/progress.log`) via {@link ProgressLog},
 * enabling `tail -f` monitoring when running inside buffered environments
 * (e.g. Claude Code's Bash tool).
 *
 * @module
 */
import type { RunSummary } from './types.js';
/**
 * Plain-text progress log file writer.
 *
 * Mirrors console progress output to `.agents-reverse-engineer/progress.log`
 * without ANSI escape codes, enabling real-time monitoring via `tail -f`
 * when the CLI runs inside buffered environments (e.g. Claude Code).
 *
 * Uses promise-chain serialization (same pattern as {@link TraceWriter})
 * to handle concurrent writes from multiple pool workers safely.
 *
 * @example
 * ```typescript
 * const log = new ProgressLog('/project/.agents-reverse-engineer/progress.log');
 * log.write('=== ARE Generate (2026-02-09) ===');
 * log.write('[1/10] ANALYZING src/index.ts');
 * await log.finalize();
 * ```
 */
export declare class ProgressLog {
    private readonly filePath;
    private writeQueue;
    private fd;
    constructor(filePath: string);
    /**
     * Create a ProgressLog for a project root.
     *
     * @param projectRoot - Absolute path to the project root directory
     * @returns A new ProgressLog instance
     */
    static create(projectRoot: string): ProgressLog;
    /**
     * Append a line to the progress log file.
     *
     * On first call, creates the parent directory and opens the file
     * in truncate mode ('w'). Subsequent writes append to the open handle.
     * Write failures are silently swallowed (non-critical telemetry).
     */
    write(line: string): void;
    /** Flush all pending writes and close the file handle. */
    finalize(): Promise<void>;
}
/**
 * Streaming build-log progress reporter.
 *
 * Create one instance per command run. Call the event methods as files
 * are processed. Call {@link printSummary} at the end of the run.
 *
 * @example
 * ```typescript
 * const reporter = new ProgressReporter(fileCount);
 * reporter.onFileStart('src/index.ts');
 * reporter.onFileDone('src/index.ts', 1200, 500, 300, 'sonnet');
 * reporter.printSummary(summary);
 * ```
 */
export declare class ProgressReporter {
    /** Total number of file tasks in this run */
    private readonly totalFiles;
    /** Number of files that have started processing */
    private started;
    /** Number of files completed successfully */
    private completed;
    /** Number of files that failed */
    private failed;
    /** Sliding window of recent completion durations for ETA */
    private readonly completionTimes;
    /** Maximum window size for ETA moving average */
    private readonly windowSize;
    /** Total number of directory tasks in this run */
    private totalDirectories;
    /** Number of directory tasks that have started */
    private dirStarted;
    /** Number of directory tasks completed */
    private dirCompleted;
    /** Sliding window of recent directory completion durations for ETA */
    private readonly dirCompletionTimes;
    /** Optional file-based progress log for tail -f monitoring */
    private readonly progressLog;
    /**
     * Create a new progress reporter.
     *
     * @param totalFiles - Total number of file tasks to process
     * @param totalDirectories - Total number of directory tasks to process
     * @param progressLog - Optional progress log for file-based output mirroring
     */
    constructor(totalFiles: number, totalDirectories?: number, progressLog?: ProgressLog);
    /**
     * Log the start of file analysis.
     *
     * Output format: `[X/Y] ANALYZING path`
     *
     * @param filePath - Relative path to the file being analyzed
     */
    onFileStart(filePath: string): void;
    /**
     * Log the successful completion of file analysis.
     *
     * Output format: `[X/Y] DONE path Xs in/out tok ~Ns remaining`
     *
     * Records the completion time for ETA calculation.
     *
     * @param filePath - Relative path to the completed file
     * @param durationMs - Wall-clock duration of the AI call
     * @param tokensIn - Number of input tokens consumed (non-cached)
     * @param tokensOut - Number of output tokens generated
     * @param model - Model identifier used for this call
     * @param cacheReadTokens - Number of cache read input tokens
     */
    onFileDone(filePath: string, durationMs: number, tokensIn: number, tokensOut: number, model: string, cacheReadTokens?: number, cacheCreationTokens?: number): void;
    /**
     * Log a file analysis failure.
     *
     * Output format: `[X/Y] FAIL path error`
     *
     * @param filePath - Relative path to the failed file
     * @param error - Error message describing the failure
     */
    onFileError(filePath: string, error: string): void;
    /**
     * Log the start of directory AGENTS.md generation.
     *
     * Output format: `[dir X/Y] ANALYZING dirPath/AGENTS.md`
     *
     * @param dirPath - Path to the directory
     */
    onDirectoryStart(dirPath: string): void;
    /**
     * Log the completion of directory AGENTS.md generation.
     *
     * Output format: `[dir X/Y] DONE dirPath/AGENTS.md Xs in/out tok model ~ETA`
     *
     * @param dirPath - Path to the directory
     * @param durationMs - Wall-clock duration of the AI call
     * @param tokensIn - Number of input tokens consumed (non-cached)
     * @param tokensOut - Number of output tokens generated
     * @param model - Model identifier used for this call
     * @param cacheReadTokens - Number of cache read input tokens
     */
    onDirectoryDone(dirPath: string, durationMs: number, tokensIn: number, tokensOut: number, model: string, cacheReadTokens?: number, cacheCreationTokens?: number): void;
    /**
     * Print the end-of-run summary.
     *
     * Shows files processed, token counts, files read with unique dedup,
     * time elapsed, errors, and retries.
     *
     * @param summary - Aggregated run summary
     */
    printSummary(summary: RunSummary): void;
    /**
     * Compute and format the estimated time remaining.
     *
     * Uses a moving average of the last 10 completion times.
     * Returns an empty string if fewer than 2 completions have occurred.
     *
     * @returns Formatted ETA string like ` ~12s remaining` or ` ~2m 30s remaining`
     */
    private formatETA;
    /**
     * Compute and format the estimated time remaining for directory tasks.
     *
     * Uses a moving average of the last 10 directory completion times.
     * Returns an empty string if fewer than 2 completions have occurred.
     */
    private formatDirectoryETA;
}
//# sourceMappingURL=progress.d.ts.map