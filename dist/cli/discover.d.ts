/**
 * `are discover` command - Discover files to analyze
 *
 * Walks a directory tree and applies filters (gitignore, vendor, binary, custom)
 * to identify files suitable for analysis.
 */
import type { ITraceWriter } from '../orchestration/trace.js';
/**
 * Options for the discover command.
 */
export interface DiscoverOptions {
    /**
     * Optional trace writer for emitting discovery events.
     */
    tracer?: ITraceWriter;
    /**
     * Enable debug output.
     * @default false
     */
    debug?: boolean;
    /**
     * Show excluded files in output.
     * @default false
     */
    showExcluded?: boolean;
}
/**
 * Execute the `are discover` command.
 *
 * Discovers files in the target directory, applying all configured filters
 * (gitignore, vendor, binary, custom patterns).
 *
 * @param targetPath - Directory to scan (defaults to current working directory)
 * @param options - Command options
 *
 * @example
 * ```typescript
 * await discoverCommand('.', {});
 * ```
 */
export declare function discoverCommand(targetPath: string, options: DiscoverOptions): Promise<void>;
//# sourceMappingURL=discover.d.ts.map