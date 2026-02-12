/**
 * High-level file discovery pipeline.
 *
 * Combines directory walking and filter application into a single function
 * that all commands can share.
 */
import type { FilterResult } from './types.js';
import type { ITraceWriter } from '../orchestration/trace.js';
/**
 * Configuration subset needed for file discovery.
 * Structurally compatible with the full Config type from config/schema.ts.
 */
export interface DiscoveryConfig {
    exclude: {
        vendorDirs: string[];
        binaryExtensions: string[];
        patterns: string[];
    };
    options: {
        maxFileSize: number;
        followSymlinks: boolean;
    };
}
/**
 * Options for the discovery pipeline.
 */
export interface DiscoverFilesOptions {
    tracer?: ITraceWriter;
    debug?: boolean;
}
/**
 * Discover files in a directory by walking and applying the standard filter chain.
 *
 * Creates the four standard filters (gitignore, vendor, binary, custom),
 * walks the directory tree, and applies the filters. Returns the full
 * FilterResult so callers can access both included and excluded files
 * with filter attribution.
 *
 * @param root - Absolute path to the directory to scan
 * @param config - Discovery-related configuration (exclude rules and options)
 * @param options - Optional tracing and debug settings
 * @returns FilterResult with included and excluded file lists
 */
export declare function discoverFiles(root: string, config: DiscoveryConfig, options?: DiscoverFilesOptions): Promise<FilterResult>;
//# sourceMappingURL=run.d.ts.map