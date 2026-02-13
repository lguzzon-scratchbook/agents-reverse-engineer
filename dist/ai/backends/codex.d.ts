/**
 * Codex CLI backend adapter.
 *
 * Implements the {@link AIBackend} interface for the Codex CLI (`codex`).
 * Uses `codex exec --json` and parses JSONL events, with a plain-text
 * fallback for compatibility with CLI output changes.
 *
 * @module
 */
import type { AIBackend, AICallOptions, AIResponse } from '../types.js';
/**
 * Codex CLI backend adapter.
 */
export declare class CodexBackend implements AIBackend {
    readonly name = "codex";
    readonly cliCommand = "codex";
    isAvailable(): Promise<boolean>;
    buildArgs(options: AICallOptions): string[];
    composeStdinInput(options: AICallOptions): string;
    parseResponse(stdout: string, durationMs: number, exitCode: number): AIResponse;
    getInstallInstructions(): string;
}
//# sourceMappingURL=codex.d.ts.map