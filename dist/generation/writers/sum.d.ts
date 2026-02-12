import type { SummaryMetadata } from '../types.js';
/**
 * Content structure for a .sum file.
 */
export interface SumFileContent {
    /** Main summary text (detailed description) */
    summary: string;
    /** Extracted metadata */
    metadata: SummaryMetadata;
    /** Generation timestamp */
    generatedAt: string;
    /** SHA-256 hash of source file content (for change detection) */
    contentHash: string;
}
/**
 * Parse a .sum file back into structured content.
 * Returns null if file doesn't exist or is invalid.
 */
export declare function readSumFile(sumPath: string): Promise<SumFileContent | null>;
/**
 * Write a .sum file alongside a source file.
 * Creates: foo.ts -> foo.ts.sum
 *
 * @param sourcePath - Path to the source file
 * @param content - Summary content to write
 * @returns Path to the written .sum file
 */
export declare function writeSumFile(sourcePath: string, content: SumFileContent): Promise<string>;
/**
 * Get the .sum path for a source file.
 */
export declare function getSumPath(sourcePath: string): string;
/**
 * Check if a .sum file exists for a source file.
 */
export declare function sumFileExists(sourcePath: string): Promise<boolean>;
/**
 * Write an annex file alongside a source file.
 * Contains the full source content for reproduction-critical files
 * whose verbatim constants cannot fit within .sum word limits.
 *
 * Example: foo.ts -> foo.annex.sum
 *
 * @param sourcePath - Absolute path to the source file
 * @param sourceContent - Full source file content
 * @returns Path to the written annex file
 */
export declare function writeAnnexFile(sourcePath: string, sourceContent: string): Promise<string>;
/**
 * Get the .annex.sum path for a source file.
 *
 * Strips the source extension: foo.ts -> foo.annex.sum
 */
export declare function getAnnexPath(sourcePath: string): string;
//# sourceMappingURL=sum.d.ts.map