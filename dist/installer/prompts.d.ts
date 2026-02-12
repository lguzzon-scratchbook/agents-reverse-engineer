/**
 * Interactive prompts module for the installer
 *
 * Provides arrow key selection in TTY mode with numbered fallback for CI/non-interactive.
 * Uses Node.js readline module with raw mode for keypress handling.
 *
 * CRITICAL: Raw mode is always cleaned up via try/finally and process exit handlers.
 */
import type { Runtime, Location } from './types.js';
/**
 * Check if stdin is a TTY (interactive terminal)
 *
 * @returns true if running in interactive terminal, false for CI/piped input
 */
export declare function isInteractive(): boolean;
/**
 * Option type for selection prompts
 */
interface SelectOption<T> {
    label: string;
    value: T;
}
/**
 * Generic option selector that uses arrow keys in TTY, numbered in non-TTY
 *
 * @param prompt - Question to display
 * @param options - Array of options with labels and values
 * @returns Selected value
 */
export declare function selectOption<T>(prompt: string, options: SelectOption<T>[]): Promise<T>;
/**
 * Prompt user to select a runtime
 *
 * @param mode - 'install' or 'uninstall' to customize prompt text
 * @returns Selected runtime value
 */
export declare function selectRuntime(mode?: 'install' | 'uninstall'): Promise<Runtime>;
/**
 * Prompt user to select installation location
 *
 * @param mode - 'install' or 'uninstall' to customize prompt text
 * @returns Selected location value
 */
export declare function selectLocation(mode?: 'install' | 'uninstall'): Promise<Location>;
/**
 * Prompt user to confirm an action
 *
 * @param message - Confirmation message to display
 * @returns true if confirmed, false if declined
 */
export declare function confirmAction(message: string): Promise<boolean>;
export {};
//# sourceMappingURL=prompts.d.ts.map