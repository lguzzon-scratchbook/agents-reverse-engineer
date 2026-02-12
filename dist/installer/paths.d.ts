/**
 * Path resolution for installer module
 *
 * Provides cross-platform path resolution for AI coding assistant runtimes.
 * Uses os.homedir() for global paths and path.join() for cross-platform compatibility.
 */
import type { Runtime, Location, RuntimePaths } from './types.js';
/**
 * Get all supported runtime identifiers (excludes 'all' meta-runtime)
 *
 * @returns Array of concrete runtime identifiers
 */
export declare function getAllRuntimes(): Array<Exclude<Runtime, 'all'>>;
/**
 * Get path configuration for a specific runtime
 *
 * Returns global and local installation paths plus settings file location.
 * All paths are cross-platform using os.homedir() and path.join().
 *
 * Environment variable overrides (in priority order):
 * - Claude: CLAUDE_CONFIG_DIR
 * - OpenCode: OPENCODE_CONFIG_DIR > XDG_CONFIG_HOME/opencode
 * - Gemini: GEMINI_CONFIG_DIR
 *
 * @param runtime - Target runtime (claude, opencode, or gemini)
 * @returns Path configuration object with global, local, and settingsFile paths
 */
export declare function getRuntimePaths(runtime: Exclude<Runtime, 'all'>): RuntimePaths;
/**
 * Resolve full installation path for a runtime and location
 *
 * For global location, returns the absolute global path.
 * For local location, returns the local path joined with project root.
 *
 * @param runtime - Target runtime (claude, opencode, or gemini)
 * @param location - Installation location (global or local)
 * @param projectRoot - Project root directory for local installs (defaults to cwd)
 * @returns Resolved absolute path for installation
 */
export declare function resolveInstallPath(runtime: Exclude<Runtime, 'all'>, location: Location, projectRoot?: string): string;
/**
 * Get the settings file path for a runtime
 *
 * Settings files are used for hook registration (Claude Code uses settings.json).
 *
 * @param runtime - Target runtime (claude, opencode, or gemini)
 * @returns Absolute path to the settings file
 */
export declare function getSettingsPath(runtime: Exclude<Runtime, 'all'>): string;
/**
 * Check if a runtime is installed locally in a project.
 *
 * Checks for the presence of the local config directory (e.g., .claude, .opencode, .gemini).
 *
 * @param runtime - Target runtime (claude, opencode, or gemini)
 * @param projectRoot - Project root directory to check
 * @returns True if the runtime's local config directory exists
 */
export declare function isRuntimeInstalledLocally(runtime: Exclude<Runtime, 'all'>, projectRoot: string): Promise<boolean>;
/**
 * Check if a runtime is installed globally.
 *
 * Checks for the presence of the global config directory.
 *
 * @param runtime - Target runtime (claude, opencode, or gemini)
 * @returns True if the runtime's global config directory exists
 */
export declare function isRuntimeInstalledGlobally(runtime: Exclude<Runtime, 'all'>): Promise<boolean>;
/**
 * Get list of runtimes installed locally in a project.
 *
 * @param projectRoot - Project root directory to check
 * @returns Array of runtime identifiers that are installed locally
 */
export declare function getInstalledRuntimes(projectRoot: string): Promise<Array<Exclude<Runtime, 'all'>>>;
//# sourceMappingURL=paths.d.ts.map