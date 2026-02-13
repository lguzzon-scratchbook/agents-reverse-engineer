/**
 * File operations for installer module
 *
 * Handles copying command/hook files to runtime directories,
 * verifying installations, and registering hooks in settings.json.
 */
import type { Runtime, Location, InstallerResult } from './types.js';
/**
 * Options for install operations
 */
export interface InstallOptions {
    /** Overwrite existing files */
    force: boolean;
    /** Preview mode - don't write files */
    dryRun: boolean;
}
/**
 * Install files for one or all runtimes
 *
 * If runtime is 'all', installs to all supported runtimes.
 * Otherwise, installs to the specified runtime only.
 *
 * @param runtime - Target runtime or 'all'
 * @param location - Installation location (global or local)
 * @param options - Install options (force, dryRun)
 * @returns Array of installation results (one per runtime)
 */
export declare function installFiles(runtime: Runtime, location: Location, options: InstallOptions): InstallerResult[];
/**
 * Verify that installed files exist
 *
 * @param files - Array of file paths to verify
 * @returns Object with success status and list of missing files
 */
export declare function verifyInstallation(files: string[]): {
    success: boolean;
    missing: string[];
};
/**
 * Register ARE hooks in settings.json
 *
 * Registers PostToolUse hooks (context loader) for Claude Code.
 * Merges with existing hooks, doesn't overwrite.
 *
 * @param basePath - Base installation path (e.g., ~/.claude or ~/.gemini)
 * @param runtime - Target runtime (claude or gemini)
 * @param dryRun - If true, don't write changes
 * @returns true if any hook was added, false if all already existed
 */
export declare function registerHooks(basePath: string, runtime: Exclude<Runtime, 'all'>, dryRun: boolean): boolean;
/**
 * Register ARE permissions in settings.json
 *
 * Adds bash command permissions for ARE commands to reduce friction.
 *
 * @param settingsPath - Path to settings.json
 * @param dryRun - If true, don't write changes
 * @returns true if permissions were added, false if already existed
 */
export declare function registerPermissions(settingsPath: string, dryRun: boolean): boolean;
/**
 * Get package version from package.json
 *
 * @returns Version string or 'unknown' if can't read
 */
export declare function getPackageVersion(): string;
/**
 * Write ARE-VERSION file to track installed version
 *
 * @param basePath - Base installation path
 * @param dryRun - If true, don't write the file
 */
export declare function writeVersionFile(basePath: string, dryRun: boolean): void;
/**
 * Format installation result for display
 *
 * Generates human-readable lines showing created/skipped files.
 *
 * @param result - Installation result to format
 * @returns Array of formatted lines for display
 */
export declare function formatInstallResult(result: InstallerResult): string[];
//# sourceMappingURL=operations.d.ts.map