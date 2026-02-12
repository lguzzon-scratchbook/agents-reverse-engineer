/**
 * `are clean` command - Delete all generated documentation artifacts
 *
 * Removes .sum files, generated AGENTS.md files, generated CLAUDE.md files,
 * and the GENERATION-PLAN.md file. Restores user-authored .local.md files.
 */
/**
 * Options for the clean command.
 */
export interface CleanOptions {
    /**
     * Show files that would be deleted without deleting them.
     * @default false
     */
    dryRun: boolean;
}
/**
 * Execute the `are clean` command.
 *
 * Finds and deletes all generated documentation artifacts:
 * - `*.sum` files
 * - Generated `AGENTS.md` files (marker-checked)
 * - Generated `CLAUDE.md` files (marker-checked)
 * - `.agents-reverse-engineer/GENERATION-PLAN.md`
 *
 * @param targetPath - Project root directory (defaults to current working directory)
 * @param options - Command options
 */
export declare function cleanCommand(targetPath: string, options: CleanOptions): Promise<void>;
//# sourceMappingURL=clean.d.ts.map