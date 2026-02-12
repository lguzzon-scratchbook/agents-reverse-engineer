/**
 * CLI specify command
 *
 * Generates a project specification from AGENTS.md documentation by:
 * 1. Loading configuration
 * 2. Collecting all AGENTS.md files (auto-generating if none exist)
 * 3. Building a synthesis prompt from the collected docs
 * 4. Resolving an AI CLI backend and calling the AI service
 * 5. Writing the specification to disk (single or multi-file)
 *
 * With --dry-run, shows input statistics without making any AI calls.
 */
/**
 * Options for the specify command.
 */
export interface SpecifyOptions {
    /** Custom output path (default: specs/SPEC.md) */
    output?: string;
    /** Overwrite existing specs */
    force?: boolean;
    /** Show plan without calling AI */
    dryRun?: boolean;
    /** Split output into multiple files */
    multiFile?: boolean;
    /** Show verbose debug info */
    debug?: boolean;
    /** Enable tracing */
    trace?: boolean;
    /** Override AI model (defaults to "opus" for specify) */
    model?: string;
    /** Override AI backend (e.g., "claude", "opencode", "gemini") */
    backend?: string;
}
/**
 * Specify command - collects AGENTS.md documentation, synthesizes it via AI,
 * and writes a comprehensive project specification.
 *
 * @param targetPath - Directory to generate specification for
 * @param options - Command options (output, force, dryRun, multiFile, debug, trace)
 */
export declare function specifyCommand(targetPath: string, options: SpecifyOptions): Promise<void>;
//# sourceMappingURL=specify.d.ts.map