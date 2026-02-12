import type { PromptContext } from './types.js';
import type { Logger } from '../../core/logger.js';
/**
 * Detect language from file extension for syntax highlighting.
 */
export declare function detectLanguage(filePath: string): string;
/**
 * Build a complete prompt for file analysis.
 */
export declare function buildFilePrompt(context: PromptContext, debug?: boolean, logger?: Logger): {
    system: string;
    user: string;
};
/**
 * Build a prompt for generating a directory-level AGENTS.md.
 *
 * Reads all .sum files in the directory, child AGENTS.md files,
 * and AGENTS.local.md to provide full context to the LLM.
 */
export declare function buildDirectoryPrompt(dirPath: string, projectRoot: string, debug?: boolean, knownDirs?: Set<string>, projectStructure?: string, existingAgentsMd?: string, logger?: Logger): Promise<{
    system: string;
    user: string;
}>;
//# sourceMappingURL=builder.d.ts.map