/**
 * Options for the update command.
 */
export interface UpdateCommandOptions {
    /** Include uncommitted changes (staged + working directory) */
    uncommitted?: boolean;
    /** Dry run - show plan without making changes */
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
 * Update command - incrementally updates documentation based on git changes.
 *
 * This command:
 * 1. Checks git repository status
 * 2. Detects files changed since last run (via content-hash comparison)
 * 3. Cleans up orphaned .sum files
 * 4. Resolves an AI CLI backend and creates the AI service
 * 5. Analyzes changed files concurrently via CommandRunner
 * 6. Regenerates AGENTS.md for affected directories
 * 7. Writes telemetry run log and prints run summary
 *
 * Exit codes: 0 = all success, 1 = partial failure, 2 = total failure / no CLI
 */
export declare function updateCommand(targetPath: string, options: UpdateCommandOptions): Promise<void>;
//# sourceMappingURL=update.d.ts.map