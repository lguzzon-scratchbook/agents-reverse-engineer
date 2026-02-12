/**
 * Filter chain orchestration for file discovery.
 *
 * This module exports all filter creators and provides the applyFilters
 * function that runs files through the filter chain, recording which
 * filter excluded each file.
 */
import type { FileFilter, FilterResult } from '../types.js';
import type { ITraceWriter } from '../../orchestration/trace.js';
import type { Logger } from '../../core/logger.js';
export { createGitignoreFilter } from './gitignore.js';
export { createVendorFilter, DEFAULT_VENDOR_DIRS } from './vendor.js';
export { createBinaryFilter, BINARY_EXTENSIONS, type BinaryFilterOptions } from './binary.js';
export { createCustomFilter } from './custom.js';
/**
 * Applies a chain of filters to a list of files.
 *
 * Each file is run through filters in order until one excludes it
 * (short-circuit evaluation). Files are processed with bounded concurrency
 * to avoid opening too many file handles simultaneously (important for
 * binary content detection which performs file I/O).
 *
 * @param files - Array of absolute file paths to filter
 * @param filters - Array of filters to apply in order
 * @param options - Optional tracing and debug options
 * @returns Promise resolving to FilterResult with included and excluded lists
 *
 * @example
 * ```typescript
 * const filters = [
 *   createVendorFilter(['node_modules']),
 *   createBinaryFilter({}),
 * ];
 * const result = await applyFilters(['/a/b.js', '/a/node_modules/c.js'], filters);
 * // result.included: ['/a/b.js']
 * // result.excluded: [{ path: '/a/node_modules/c.js', filter: 'vendor', reason: '...' }]
 * ```
 */
export declare function applyFilters(files: string[], filters: FileFilter[], options?: {
    tracer?: ITraceWriter;
    debug?: boolean;
    logger?: Logger;
}): Promise<FilterResult>;
//# sourceMappingURL=index.d.ts.map