/**
 * Terminal logger for agents-reverse
 *
 * Provides colored output.
 * Output format follows CONTEXT.md human-readable specification.
 */
import pc from 'picocolors';
/**
 * Identity function for no-color mode
 */
const identity = (s) => s;
/**
 * No-color formatter that returns strings unchanged
 */
const noColor = {
    green: identity,
    dim: identity,
    red: identity,
    bold: identity,
    yellow: identity,
};
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
export function createLogger(options) {
    const c = options.colors ? pc : noColor;
    return {
        info(message) {
            console.log(message);
        },
        file(path) {
            console.log(c.green('  +') + ' ' + path);
        },
        excluded(path, reason, filter) {
            console.log(c.dim('  -') + ' ' + path + c.dim(` (${reason}: ${filter})`));
        },
        summary(included, excluded) {
            console.log(c.bold(`\nDiscovered ${included} files`) +
                c.dim(` (${excluded} excluded)`));
        },
        warn(message) {
            console.warn(c.yellow('Warning: ') + message);
        },
        error(message) {
            console.error(c.red('Error: ') + message);
        },
    };
}
/**
 * Create a silent logger that produces no output.
 *
 * Useful for testing or programmatic usage.
 *
 * @returns Logger instance with all no-op methods
 */
export function createSilentLogger() {
    const noop = () => { };
    return {
        info: noop,
        file: noop,
        excluded: noop,
        summary: noop,
        warn: noop,
        error: noop,
    };
}
//# sourceMappingURL=logger.js.map