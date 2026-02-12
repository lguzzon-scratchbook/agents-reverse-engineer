/**
 * Binary file filter for file discovery.
 *
 * Uses extension-based detection as a fast path, falling back to content
 * analysis via `isbinaryfile` for unknown extensions. Also handles large
 * files by size threshold.
 */
import type { FileFilter } from '../types.js';
/**
 * Set of file extensions known to be binary.
 * These are excluded without content analysis for performance.
 */
export declare const BINARY_EXTENSIONS: Set<string>;
/**
 * Options for the binary filter.
 */
export interface BinaryFilterOptions {
    /**
     * Maximum file size in bytes. Files larger than this are excluded.
     * Default: 1MB (1048576 bytes)
     */
    maxFileSize?: number;
    /**
     * Additional binary extensions to recognize beyond the defaults.
     */
    additionalExtensions?: string[];
}
/**
 * Creates a binary filter that excludes binary files and files exceeding size limit.
 *
 * The filter uses a two-phase detection approach:
 * 1. Fast path: Check extension against known binary extensions
 * 2. Slow path: For unknown extensions, analyze file content with isbinaryfile
 *
 * @param options - Filter configuration options
 * @returns A FileFilter that identifies binary files
 *
 * @example
 * ```typescript
 * const filter = createBinaryFilter({ maxFileSize: 500000 });
 * await filter.shouldExclude('/path/to/image.png'); // true (extension)
 * await filter.shouldExclude('/path/to/unknown.xyz'); // checks content
 * ```
 */
export declare function createBinaryFilter(options?: BinaryFilterOptions): FileFilter;
//# sourceMappingURL=binary.d.ts.map