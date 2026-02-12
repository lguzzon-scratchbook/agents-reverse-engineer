/**
 * Configuration loader for agents-reverse
 *
 * Loads and validates configuration from `.agents-reverse/config.yaml`.
 * Returns sensible defaults when no config file exists.
 */
import { Config } from './schema.js';
import type { Logger } from '../core/logger.js';
import type { ITraceWriter } from '../orchestration/trace.js';
/** Directory name for agents-reverse-engineer configuration */
export declare const CONFIG_DIR = ".agents-reverse-engineer";
/** Configuration file name */
export declare const CONFIG_FILE = "config.yaml";
/**
 * Walk up from `startDir` looking for an existing `.agents-reverse-engineer/` directory.
 * Returns the directory containing it, or `startDir` if none found.
 */
export declare function findProjectRoot(startDir: string): Promise<string>;
/**
 * Error thrown when configuration parsing or validation fails
 */
export declare class ConfigError extends Error {
    readonly filePath: string;
    readonly cause?: Error | undefined;
    constructor(message: string, filePath: string, cause?: Error | undefined);
}
/**
 * Load configuration from `.agents-reverse/config.yaml`.
 *
 * If the file doesn't exist, returns default configuration.
 * If the file exists but is invalid, throws a ConfigError with details.
 *
 * @param root - Root directory containing `.agents-reverse/` folder
 * @param options - Optional configuration loading options
 * @param options.tracer - Trace writer for emitting config:loaded events
 * @param options.debug - Enable debug output for configuration loading
 * @returns Validated configuration object with all defaults applied
 * @throws ConfigError if the config file exists but is invalid
 *
 * @example
 * ```typescript
 * const config = await loadConfig('/path/to/project');
 * console.log(config.exclude.vendorDirs);
 * ```
 */
export declare function loadConfig(root: string, options?: {
    tracer?: ITraceWriter;
    debug?: boolean;
    logger?: Logger;
}): Promise<Config>;
/**
 * Check if a configuration file exists.
 *
 * @param root - Root directory to check
 * @returns true if `.agents-reverse/config.yaml` exists
 *
 * @example
 * ```typescript
 * if (!await configExists('.')) {
 *   console.log('Run `are init` to create configuration');
 * }
 * ```
 */
export declare function configExists(root: string): Promise<boolean>;
/**
 * Write a default configuration file with helpful comments.
 *
 * Creates the `.agents-reverse/` directory if it doesn't exist.
 * The generated file includes comments explaining each option.
 *
 * @param root - Root directory where `.agents-reverse/` will be created
 *
 * @example
 * ```typescript
 * await writeDefaultConfig('/path/to/project');
 * // Creates /path/to/project/.agents-reverse/config.yaml
 * ```
 */
export declare function writeDefaultConfig(root: string): Promise<void>;
//# sourceMappingURL=loader.d.ts.map