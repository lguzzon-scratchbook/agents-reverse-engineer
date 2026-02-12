/**
 * Vendor directory filter for file discovery.
 *
 * Excludes files within common vendor/dependency directories that typically
 * contain third-party code not relevant for documentation purposes.
 */
import type { FileFilter } from '../types.js';
/**
 * Default vendor directories to exclude.
 * These are common directories containing third-party code, build output,
 * or generated files that should not be analyzed.
 */
export declare const DEFAULT_VENDOR_DIRS: readonly ["node_modules", "vendor", ".git", "dist", "build", "__pycache__", ".next", "venv", ".venv", "target"];
/**
 * Creates a vendor filter that excludes files within specified directories.
 *
 * Supports two patterns:
 * - Single directory names (e.g., 'node_modules') - matches anywhere in path
 * - Path patterns (e.g., 'apps/vendor' or '.agents/skills') - matches path containing this sequence
 *
 * @param vendorDirs - Array of directory names or path patterns to exclude.
 * @returns A FileFilter that checks if a path is within a vendor directory
 *
 * @example
 * ```typescript
 * const filter = createVendorFilter(['node_modules', '.agents/skills']);
 * filter.shouldExclude('/project/node_modules/lodash/index.js'); // true
 * filter.shouldExclude('/project/apps/foo/.agents/skills/bar.md'); // true
 * filter.shouldExclude('/project/src/utils.js'); // false
 * ```
 */
export declare function createVendorFilter(vendorDirs: string[]): FileFilter;
//# sourceMappingURL=vendor.d.ts.map