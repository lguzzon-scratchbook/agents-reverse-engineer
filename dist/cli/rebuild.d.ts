/**
 * CLI rebuild command
 *
 * Reconstructs a project from specification files by:
 * 1. Reading spec files from specs/ directory
 * 2. Partitioning into ordered rebuild units
 * 3. Resolving an AI CLI backend
 * 4. Running the rebuild orchestrator with checkpoint-based session continuity
 * 5. Writing generated source files to an output directory
 *
 * With --dry-run, shows the rebuild plan without making any AI calls.
 */
/**
 * Options for the rebuild command.
 */
export interface RebuildOptions {
    /** Custom output directory (default: rebuild/) */
    output?: string;
    /** Wipe output directory and start fresh */
    force?: boolean;
    /** Show plan without executing */
    dryRun?: boolean;
    /** Override worker pool size */
    concurrency?: number;
    /** Stop on first failure */
    failFast?: boolean;
    /** Verbose subprocess logging */
    debug?: boolean;
    /** Enable NDJSON tracing */
    trace?: boolean;
    /** Override AI model (defaults to "opus" for rebuild) */
    model?: string;
    /** Override AI backend (e.g., "claude", "codex", "opencode", "gemini") */
    backend?: string;
}
/**
 * Rebuild command - reconstructs a project from specification files via
 * AI-driven code generation with checkpoint-based session continuity.
 *
 * @param targetPath - Directory containing specs/ to rebuild from
 * @param options - Command options (output, force, dryRun, concurrency, etc.)
 */
export declare function rebuildCommand(targetPath: string, options: RebuildOptions): Promise<void>;
//# sourceMappingURL=rebuild.d.ts.map