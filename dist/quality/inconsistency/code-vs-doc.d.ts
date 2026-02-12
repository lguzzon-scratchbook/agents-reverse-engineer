/**
 * Heuristic code-vs-doc inconsistency detection.
 *
 * Compares exported symbols in TypeScript/JavaScript source against the
 * content of the corresponding .sum file to flag documentation drift.
 */
import type { SumFileContent } from '../../generation/writers/sum.js';
import type { CodeDocInconsistency } from '../types.js';
/**
 * Extract named and default export identifiers from TypeScript/JavaScript source.
 *
 * Matches declarations like `export function foo`, `export const BAR`,
 * `export default class App`, etc. Ignores re-exports, commented-out lines,
 * and internal (non-exported) declarations.
 *
 * @param sourceContent - Raw source file content
 * @returns Array of exported identifier names
 */
export declare function extractExports(sourceContent: string): string[];
/**
 * Compare source exports against .sum documentation content.
 *
 * Detects two kinds of inconsistency:
 * - **missingFromDoc**: symbols exported in source but not mentioned in .sum text
 * - **missingFromCode**: items listed in `publicInterface` with no matching export
 *
 * Uses case-sensitive matching. Returns `null` when documentation is consistent.
 *
 * @param sourceContent - Raw source file content
 * @param sumContent - Parsed .sum file content
 * @param filePath - Path to the source file (used in report)
 * @returns Inconsistency descriptor, or null if consistent
 */
export declare function checkCodeVsDoc(sourceContent: string, sumContent: SumFileContent, filePath: string): CodeDocInconsistency | null;
//# sourceMappingURL=code-vs-doc.d.ts.map