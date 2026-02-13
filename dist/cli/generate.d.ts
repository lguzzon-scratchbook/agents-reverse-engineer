/**
 * CLI generate command
 *
 * Creates and executes a documentation generation plan by:
 * 1. Discovering files to analyze
 * 2. Detecting file types and creating analysis tasks
 * 3. Resolving an AI CLI backend
 * 4. Running concurrent AI analysis via CommandRunner
 * 5. Producing .sum files, AGENTS.md, and companion CLAUDE.md per directory
 *
 * With --dry-run, shows the plan without making any AI calls.
 */
/**
 * Options for the generate command.
 */
export interface GenerateOptions {
    /** Force full regeneration (skip nothing) */
    force?: boolean;
    /** Dry run - show plan without generating */
    dryRun?: boolean;
    /** Number of concurrent AI calls */
    concurrency?: number;
    /** Stop on first file analysis failure */
    failFast?: boolean;
    /** Show AI prompts and backend details */
    debug?: boolean;
    /** Enable concurrency tracing to .agents-reverse-engineer/traces/ */
    trace?: boolean;
    /** Override AI model (e.g., "sonnet", "opus") */
    model?: string;
    /** Override AI backend (e.g., "claude", "codex", "opencode", "gemini") */
    backend?: string;
}
/**
 * Generate command - discovers files, plans analysis, and executes AI-driven
 * documentation generation.
 *
 * Default behavior: resolves an AI CLI backend, builds an execution plan,
 * and runs concurrent AI analysis via the CommandRunner. Produces .sum files,
 * AGENTS.md per directory, and CLAUDE.md pointers.
 *
 * @param targetPath - Directory to generate documentation for
 * @param options - Command options (concurrency, failFast, debug, etc.)
 */
export declare function generateCommand(targetPath: string, options: GenerateOptions): Promise<void>;
//# sourceMappingURL=generate.d.ts.map