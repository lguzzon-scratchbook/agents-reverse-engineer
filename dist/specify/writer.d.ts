/**
 * Options controlling spec output writing behavior.
 */
export interface WriteSpecOptions {
    /** Full path to the output file (e.g., /project/specs/SPEC.md). */
    outputPath: string;
    /** Overwrite existing files without error. */
    force: boolean;
    /** Split AI output into multiple files by top-level `# ` headings. */
    multiFile: boolean;
}
/**
 * Thrown when writeSpec() detects existing file(s) and force=false.
 * Callers should catch this and present a user-friendly message.
 */
export declare class SpecExistsError extends Error {
    /** Paths of the files that already exist. */
    readonly paths: string[];
    constructor(paths: string[]);
}
/**
 * Write spec output to disk with overwrite protection.
 *
 * In single-file mode, writes content directly to `outputPath`.
 * In multi-file mode, splits content on top-level `# ` headings and
 * writes each section to a separate file in the directory of `outputPath`.
 *
 * @param content - The full AI-generated spec markdown
 * @param options - Output path, force flag, and multi-file mode
 * @returns Array of absolute paths to all written files
 * @throws SpecExistsError if files exist and force=false
 */
export declare function writeSpec(content: string, options: WriteSpecOptions): Promise<string[]>;
//# sourceMappingURL=writer.d.ts.map