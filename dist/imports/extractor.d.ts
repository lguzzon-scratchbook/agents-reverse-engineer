import type { ImportEntry, FileImports } from './types.js';
/**
 * Extract import statements from source content.
 *
 * Only processes lines starting with 'import' to avoid matching
 * dynamic imports or imports inside comments/strings.
 */
export declare function extractImports(sourceContent: string): ImportEntry[];
/**
 * Extract and classify imports for all source files in a directory.
 *
 * Reads only the first 100 lines of each file (imports are at the top)
 * for performance. Classifies imports as internal (same directory via './')
 * or external (everything else).
 *
 * Skips node: built-ins and bare package specifiers (npm packages).
 */
export declare function extractDirectoryImports(dirPath: string, fileNames: string[]): Promise<FileImports[]>;
/**
 * Format import data as a structured text block for LLM prompts.
 *
 * Example output:
 * ```
 * runner.ts:
 *   ../ai/index.js → AIService
 *   ../generation/executor.js → ExecutionPlan, ExecutionTask
 *
 * pool.ts:
 *   ./trace.js → ITraceWriter (type)
 * ```
 */
export declare function formatImportMap(fileImports: FileImports[]): string;
//# sourceMappingURL=extractor.d.ts.map