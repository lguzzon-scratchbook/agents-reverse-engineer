/**
 * Gitignore pattern filter for file discovery.
 *
 * Uses the `ignore` library to parse and match .gitignore patterns.
 * This filter loads the root .gitignore file and checks paths against
 * the patterns to determine exclusion.
 */
import type { FileFilter } from '../types.js';
/**
 * Creates a gitignore filter that excludes files matching .gitignore patterns.
 *
 * @param root - The root directory containing the .gitignore file
 * @returns A FileFilter that checks paths against gitignore patterns
 *
 * @example
 * ```typescript
 * const filter = await createGitignoreFilter('/path/to/project');
 * if (filter.shouldExclude('/path/to/project/dist/bundle.js')) {
 *   console.log('File is gitignored');
 * }
 * ```
 */
export declare function createGitignoreFilter(root: string): Promise<FileFilter>;
//# sourceMappingURL=gitignore.d.ts.map