/**
 * Integration file generation for AI coding assistants
 *
 * Generates command files and hooks for detected AI assistant environments.
 * Handles file creation with directory creation and skip-if-exists behavior.
 */
import type { IntegrationResult, EnvironmentType } from './types.js';
/**
 * Options for generating integration files
 */
export interface GenerateOptions {
    /** If true, don't actually write files - just report what would be done */
    dryRun?: boolean;
    /** If true, overwrite existing files instead of skipping them */
    force?: boolean;
    /** Specific environment to generate for (bypasses auto-detection) */
    environment?: EnvironmentType;
}
/**
 * Generate integration files for all detected AI assistant environments
 *
 * For each detected environment:
 * - Gets appropriate templates (command files)
 * - Creates files if they don't exist (or if force=true)
 * - For Claude: also creates the session-end hook
 *
 * @param projectRoot - Root directory of the project
 * @param options - Generation options
 * @returns Array of results, one per environment
 *
 * @example
 * ```typescript
 * const results = await generateIntegrationFiles('/path/to/project');
 * // [{ environment: 'claude', filesCreated: ['...'], filesSkipped: [] }]
 * ```
 */
export declare function generateIntegrationFiles(projectRoot: string, options?: GenerateOptions): Promise<IntegrationResult[]>;
//# sourceMappingURL=generate.d.ts.map