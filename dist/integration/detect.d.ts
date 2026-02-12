/**
 * Environment detection for AI coding assistants
 *
 * Detects which AI coding assistant environments are present in a project
 * by checking for their configuration directories and files.
 */
import type { DetectedEnvironment, EnvironmentType } from './types.js';
/**
 * Detect all AI coding assistant environments present in a project
 *
 * Checks for:
 * - Claude Code: .claude/ directory OR CLAUDE.md file
 * - OpenCode: .opencode/ directory
 * - Aider: .aider.conf.yml file OR .aider/ directory
 *
 * @param projectRoot - Root directory to check for environments
 * @returns Array of detected environments (may include multiple)
 */
export declare function detectEnvironments(projectRoot: string): DetectedEnvironment[];
/**
 * Check if a specific AI coding assistant environment is present
 *
 * @param projectRoot - Root directory to check
 * @param type - Environment type to check for
 * @returns true if the environment is detected
 */
export declare function hasEnvironment(projectRoot: string, type: EnvironmentType): boolean;
//# sourceMappingURL=detect.d.ts.map