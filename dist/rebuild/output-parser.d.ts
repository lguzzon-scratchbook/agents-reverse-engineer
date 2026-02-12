/**
 * AI output parser for multi-file rebuild responses.
 *
 * Extracts individual files from AI-generated responses using
 * `===FILE: path===` / `===END_FILE===` delimiters, with a fallback
 * to markdown fenced code blocks with file path annotations.
 *
 * @module
 */
/**
 * Parse multi-file AI output into a Map of file paths to contents.
 *
 * Primary format: `===FILE: path===` / `===END_FILE===` delimiters.
 * Fallback format: Markdown fenced code blocks with `language:path` annotation.
 *
 * File paths are trimmed. File content is NOT trimmed (preserves indentation).
 * Returns an empty Map if neither format matches (caller handles error case).
 *
 * @param responseText - Raw AI response text
 * @returns Map of relative file paths to file contents
 */
export declare function parseModuleOutput(responseText: string): Map<string, string>;
//# sourceMappingURL=output-parser.d.ts.map