/**
 * Debug logger interface for core library modules.
 *
 * Allows library consumers to inject their own logging backend
 * (or silence debug output entirely with {@link nullLogger}).
 * CLI code passes {@link consoleLogger} to preserve existing behavior.
 *
 * @module
 */
/**
 * Minimal logger contract for debug/warn/error output.
 *
 * All core library modules accept an optional `Logger` to decouple
 * from direct `console.error` calls.
 */
export interface Logger {
    debug(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
/**
 * Silent logger -- all methods are no-ops.
 *
 * Used as the default when no logger is provided, ensuring library
 * consumers get zero output unless they opt in.
 */
export declare const nullLogger: Logger;
/**
 * Console logger -- writes to stderr (matching existing CLI behavior).
 *
 * CLI entry points pass this to preserve the current debug output.
 */
export declare const consoleLogger: Logger;
//# sourceMappingURL=logger.d.ts.map