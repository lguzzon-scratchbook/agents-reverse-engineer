/**
 * Heuristic cross-file inconsistency detection.
 *
 * Detects duplicate exports: the same symbol name exported from multiple
 * files within a group. The caller is responsible for scoping the file
 * list (typically per-directory) to avoid false positives across
 * unrelated modules.
 */
import type { CodeCodeInconsistency } from '../types.js';
/**
 * Detect duplicate exports across a group of files.
 *
 * For each file, extracts exported symbol names via {@link extractExports}
 * and flags any symbol that appears in more than one file.
 *
 * This is a heuristic-only check (no AI calls). The caller should scope
 * the input to per-directory file groups to avoid false positives.
 *
 * @param files - Array of source files with path and content
 * @returns Array of detected cross-file inconsistencies
 */
export declare function checkCodeVsCode(files: Array<{
    path: string;
    content: string;
}>): CodeCodeInconsistency[];
//# sourceMappingURL=code-vs-code.d.ts.map