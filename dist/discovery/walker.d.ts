/**
 * Directory walker for the agents-reverse file discovery system.
 *
 * Uses fast-glob to traverse directories and return all candidate files.
 * Filters are applied separately via the filter chain (not in this module).
 */
import type { WalkerOptions } from './types.js';
/**
 * Walk a directory tree and return all files.
 *
 * This walker returns ALL files in the directory tree. Filtering happens
 * separately via the filter chain (gitignore, binary, vendor, custom patterns).
 *
 * @param options - Walker configuration
 * @returns Array of absolute file paths
 *
 * @example
 * ```typescript
 * const files = await walkDirectory({ cwd: '/path/to/repo' });
 * console.log(`Found ${files.length} files`);
 * ```
 */
export declare function walkDirectory(options: WalkerOptions): Promise<string[]>;
//# sourceMappingURL=walker.d.ts.map