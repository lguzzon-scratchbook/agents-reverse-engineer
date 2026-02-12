/**
 * Terminal logger for agents-reverse
 *
 * Provides colored output.
 * Output format follows CONTEXT.md human-readable specification.
 */
/**
 * Logger interface for CLI output.
 */
export interface Logger {
    /** Log an informational message */
    info(message: string): void;
    /** Log a discovered file */
    file(path: string): void;
    /** Log an excluded file with reason */
    excluded(path: string, reason: string, filter: string): void;
    /** Log discovery summary */
    summary(included: number, excluded: number): void;
    /** Log a warning message */
    warn(message: string): void;
    /** Log an error message */
    error(message: string): void;
}
/**
 * Options for creating a logger instance.
 */
export interface LoggerOptions {
    /**
     * Use colors in terminal output.
     * @default true
     */
    colors: boolean;
}
/**
 * Create a logger instance with the given options.
 *
 * Output format per CONTEXT.md (human-readable):
 * - file: green "  +" prefix + relative path
 * - excluded: dim "  -" prefix + path + reason (when shown)
 * - summary: bold count + dim excluded count
 * - warn: yellow "Warning:" prefix
 * - error: red "Error:" prefix
 *
 * @param options - Logger configuration
 * @returns Logger instance
 *
 * @example
 * ```typescript
 * const log = createLogger({ colors: true });
 *
 * log.file('src/index.ts');
 * log.summary(42, 10);
 * ```
 */
export declare function createLogger(options: LoggerOptions): Logger;
/**
 * Create a silent logger that produces no output.
 *
 * Useful for testing or programmatic usage.
 *
 * @returns Logger instance with all no-op methods
 */
export declare function createSilentLogger(): Logger;
//# sourceMappingURL=logger.d.ts.map