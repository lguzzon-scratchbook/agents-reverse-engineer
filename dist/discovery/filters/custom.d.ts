/**
 * Custom pattern filter for file discovery.
 *
 * Allows users to specify additional exclusion patterns in their configuration.
 * Uses the `ignore` library for gitignore-style pattern matching.
 */
import type { FileFilter } from '../types.js';
/**
 * Creates a custom filter that excludes files matching user-provided patterns.
 *
 * Patterns use gitignore syntax and are checked against relative paths from
 * the root directory. If no patterns are provided, the filter passes all files.
 *
 * @param patterns - Array of gitignore-style patterns to exclude
 * @param root - Root directory for converting absolute paths to relative
 * @returns A FileFilter that checks paths against custom patterns
 *
 * @example
 * ```typescript
 * const filter = createCustomFilter(['*.log', 'tmp/**', 'secret.txt'], '/project');
 * filter.shouldExclude('/project/debug.log'); // true
 * filter.shouldExclude('/project/src/app.ts'); // false
 * ```
 */
export declare function createCustomFilter(patterns: string[], root: string): FileFilter;
//# sourceMappingURL=custom.d.ts.map