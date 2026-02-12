/**
 * `are init` command - Create default configuration
 *
 * Creates the `.agents-reverse/config.yaml` file with documented defaults.
 * Warns if configuration already exists.
 */
/**
 * Execute the `are init` command.
 *
 * Creates a default configuration file at `.agents-reverse/config.yaml`.
 * If the file already exists, logs a warning and returns without modification.
 *
 * @param root - Root directory where config will be created
 *
 * @example
 * ```typescript
 * await initCommand('.');
 * // Creates .agents-reverse/config.yaml in current directory
 * ```
 */
export declare function initCommand(root: string, options?: {
    force?: boolean;
}): Promise<void>;
//# sourceMappingURL=init.d.ts.map