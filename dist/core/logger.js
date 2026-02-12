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
 * Silent logger -- all methods are no-ops.
 *
 * Used as the default when no logger is provided, ensuring library
 * consumers get zero output unless they opt in.
 */
export const nullLogger = {
    debug() { },
    warn() { },
    error() { },
};
/**
 * Console logger -- writes to stderr (matching existing CLI behavior).
 *
 * CLI entry points pass this to preserve the current debug output.
 */
export const consoleLogger = {
    debug: (msg) => console.error(msg),
    warn: (msg) => console.error(msg),
    error: (msg) => console.error(msg),
};
//# sourceMappingURL=logger.js.map