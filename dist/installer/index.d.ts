/**
 * Main installer entry point for agents-reverse-engineer
 *
 * Provides the runInstaller function for npx installation workflow.
 * Supports interactive prompts and non-interactive flags for CI/scripted installs.
 */
import type { InstallerArgs, InstallerResult } from './types.js';
export type { InstallerArgs, InstallerResult, Runtime, Location, RuntimePaths } from './types.js';
export { getRuntimePaths, getAllRuntimes, resolveInstallPath, getSettingsPath } from './paths.js';
export { displayBanner, showHelp, showSuccess, showError, showWarning, showInfo, showNextSteps, VERSION } from './banner.js';
export { selectRuntime, selectLocation, confirmAction, isInteractive } from './prompts.js';
/**
 * Parse command-line arguments for the installer
 *
 * Handles both short (-g, -l, -h) and long (--global, --local, --help) flags.
 * Uses pattern from cli/index.ts for consistency.
 *
 * @param args - Command line arguments (process.argv.slice(2))
 * @returns Parsed installer arguments
 */
export declare function parseInstallerArgs(args: string[]): InstallerArgs;
/**
 * Run the installer workflow
 *
 * This is the main entry point for the installation process.
 * Supports both interactive mode (prompts) and non-interactive mode (flags).
 *
 * @param args - Parsed installer arguments
 * @returns Array of installation results (one per runtime/location combination)
 */
export declare function runInstaller(args: InstallerArgs): Promise<InstallerResult[]>;
//# sourceMappingURL=index.d.ts.map