/**
 * ASCII banner and styled output for the installer
 *
 * Provides colored banner display, help text, and styled message helpers.
 * Uses picocolors for terminal coloring.
 */
/** Package version read from package.json */
export declare const VERSION: string;
/**
 * Display the ASCII banner at installer launch
 *
 * Shows big ASCII art "ARE" letters in green with version and tagline.
 */
export declare function displayBanner(): void;
/**
 * Display help text showing usage, flags, and examples
 */
export declare function showHelp(): void;
/**
 * Display a success message with green checkmark prefix
 *
 * @param msg - Message to display
 */
export declare function showSuccess(msg: string): void;
/**
 * Display an error message with red X prefix
 *
 * @param msg - Message to display
 */
export declare function showError(msg: string): void;
/**
 * Display a warning message with yellow exclamation prefix
 *
 * @param msg - Message to display
 */
export declare function showWarning(msg: string): void;
/**
 * Display an info message with cyan arrow prefix
 *
 * @param msg - Message to display
 */
export declare function showInfo(msg: string): void;
/**
 * Display post-install next steps
 *
 * Shows what to do after installation with helpful links.
 *
 * @param runtime - Which runtime was installed
 * @param filesCreated - Number of files created
 */
export declare function showNextSteps(runtime: string, filesCreated: number): void;
//# sourceMappingURL=banner.d.ts.map