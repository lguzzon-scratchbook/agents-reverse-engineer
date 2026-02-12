/**
 * Spec file reader and partitioner for the rebuild module.
 *
 * Reads spec files from `specs/` and partitions them into rebuild units
 * based on the Build Plan section or top-level headings.
 *
 * @module
 */
import type { RebuildUnit } from './types.js';
/**
 * Read all `.md` spec files from the `specs/` directory.
 *
 * Files are returned sorted alphabetically by filename.
 * Throws a descriptive error if `specs/` doesn't exist or has no `.md` files.
 *
 * @param projectRoot - Absolute path to the project root
 * @returns Array of spec file objects with relative path and content
 */
export declare function readSpecFiles(projectRoot: string): Promise<Array<{
    relativePath: string;
    content: string;
}>>;
/**
 * Partition spec content into ordered rebuild units.
 *
 * Strategy:
 * 1. Concatenate all spec file contents
 * 2. Look for a "Build Plan" section with phase headings
 * 3. Each phase becomes a RebuildUnit with context from Architecture and Public API Surface
 * 4. Falls back to splitting on top-level `## ` headings if no Build Plan found
 *
 * Throws a descriptive error if no rebuild units can be extracted.
 * Logs a warning and skips units with empty content.
 *
 * @param specFiles - Spec files from readSpecFiles()
 * @returns Ordered array of rebuild units
 */
export declare function partitionSpec(specFiles: Array<{
    relativePath: string;
    content: string;
}>): RebuildUnit[];
//# sourceMappingURL=spec-reader.d.ts.map