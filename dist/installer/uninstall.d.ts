/**
 * Uninstall module for agents-reverse-engineer installer
 *
 * Handles removing installed command files, hooks, and hook registrations.
 * Mirrors the installation logic in operations.ts for clean reversal.
 */
import type { Runtime, Location, InstallerResult } from './types.js';
/**
 * Uninstall files for one or all runtimes
 *
 * If runtime is 'all', uninstalls from all supported runtimes.
 * Otherwise, uninstalls from the specified runtime only.
 *
 * @param runtime - Target runtime or 'all'
 * @param location - Installation location (global or local)
 * @param dryRun - If true, don't actually delete files
 * @returns Array of uninstallation results (one per runtime)
 */
export declare function uninstallFiles(runtime: Runtime, location: Location, dryRun?: boolean): InstallerResult[];
/**
 * Unregister ARE hooks from settings.json
 *
 * Removes all ARE hook entries from SessionStart, SessionEnd, and PostToolUse arrays.
 * Cleans up empty hooks structures. Handles both old and new hook paths.
 *
 * @param basePath - Base installation path (e.g., ~/.claude or ~/.gemini)
 * @param runtime - Target runtime (claude or gemini)
 * @param dryRun - If true, don't write changes
 * @returns true if any hook was removed, false if none found
 */
export declare function unregisterHooks(basePath: string, runtime: Exclude<Runtime, 'all'>, dryRun: boolean): boolean;
/**
 * Unregister ARE permissions from Claude Code settings.json
 *
 * Removes all ARE-related bash command permissions from the allow list.
 *
 * @param basePath - Base installation path (e.g., ~/.claude)
 * @param dryRun - If true, don't write changes
 * @returns true if any permissions were removed, false if none found
 */
export declare function unregisterPermissions(basePath: string, dryRun: boolean): boolean;
/**
 * Delete the .agents-reverse-engineer configuration folder
 *
 * Only applicable for local installations. Removes the entire folder
 * including configuration files and generation plans.
 *
 * @param location - Installation location (only 'local' triggers deletion)
 * @param dryRun - If true, don't actually delete
 * @returns true if folder was deleted, false if not found or not local
 */
export declare function deleteConfigFolder(location: Location, dryRun: boolean): boolean;
//# sourceMappingURL=uninstall.d.ts.map