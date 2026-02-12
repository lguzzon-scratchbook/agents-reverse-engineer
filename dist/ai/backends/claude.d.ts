/**
 * Claude CLI backend adapter.
 *
 * Full implementation of the {@link AIBackend} interface for the Claude Code
 * CLI (`claude`). Builds CLI arguments, parses structured JSON responses
 * with Zod validation, detects CLI availability on PATH, and provides
 * install instructions.
 *
 * The prompt is NOT included in the args array -- it goes to stdin via
 * the subprocess wrapper ({@link runSubprocess}).
 *
 * @module
 */
import type { AIBackend, AICallOptions, AIResponse } from '../types.js';
/**
 * Check whether a command is available on the system PATH.
 *
 * Splits `process.env.PATH` by the platform delimiter and checks each
 * directory for a file matching the command name. On Windows, also checks
 * each extension from `process.env.PATHEXT` (e.g., `.exe`, `.cmd`, `.bat`).
 *
 * Uses `fs.stat` (not `fs.access` with execute bit) for cross-platform
 * compatibility -- Windows does not have Unix execute permissions.
 *
 * @param command - The bare command name to look for (e.g., "claude")
 * @returns `true` if the command exists as a file in any PATH directory
 *
 * @example
 * ```typescript
 * if (await isCommandOnPath('claude')) {
 *   console.log('Claude CLI is available');
 * }
 * ```
 */
export declare function isCommandOnPath(command: string): Promise<boolean>;
/**
 * Claude Code CLI backend adapter.
 *
 * Implements the {@link AIBackend} interface for the `claude` CLI.
 * This is the primary (and currently only fully implemented) backend.
 *
 * @example
 * ```typescript
 * const backend = new ClaudeBackend();
 * if (await backend.isAvailable()) {
 *   const args = backend.buildArgs({ prompt: 'Summarize this file' });
 *   const result = await runSubprocess('claude', args, {
 *     timeoutMs: 120_000,
 *     input: 'Summarize this file',
 *   });
 *   const response = backend.parseResponse(result.stdout, result.durationMs, result.exitCode);
 * }
 * ```
 */
export declare class ClaudeBackend implements AIBackend {
    readonly name = "claude";
    readonly cliCommand = "claude";
    /**
     * Check if the `claude` CLI is available on PATH.
     */
    isAvailable(): Promise<boolean>;
    /**
     * Build CLI arguments for a Claude invocation.
     *
     * Returns the argument array for `claude -p --output-format json`. The
     * prompt itself is NOT included -- it goes to stdin via the subprocess
     * wrapper.
     *
     * @param options - Call options (model, systemPrompt, maxTurns)
     * @returns Argument array suitable for {@link runSubprocess}
     */
    buildArgs(options: AICallOptions): string[];
    /**
     * Parse Claude CLI JSON output into a normalized {@link AIResponse}.
     *
     * Supports two output formats:
     * - **Legacy** (CLI ≤ 2.1.31): Single JSON object on stdout, possibly
     *   preceded by non-JSON text (upgrade notices, etc.)
     * - **NDJSON** (CLI ≥ 2.1.38): Multiple newline-delimited JSON objects
     *   (`system`, `assistant`, `result`). We extract the `{"type":"result",...}`
     *   line and parse that.
     *
     * Validates the response against the Zod schema and extracts the model
     * name from `modelUsage`.
     *
     * @param stdout - Raw stdout from the Claude CLI process
     * @param durationMs - Wall-clock duration of the subprocess
     * @param exitCode - Process exit code
     * @returns Normalized AI response
     * @throws {AIServiceError} With code `PARSE_ERROR` if JSON is missing or schema validation fails
     */
    parseResponse(stdout: string, durationMs: number, exitCode: number): AIResponse;
    /**
     * Extract the result JSON string from Claude CLI stdout.
     *
     * Handles three output formats:
     * - **JSON array** (CLI ≥ 2.1.38): `[{system}, {assistant}, {result}]`
     *   Parses the array, finds the element with `type: "result"`, and
     *   re-serializes it.
     * - **NDJSON**: Multiple newline-delimited JSON objects. Finds the
     *   line with `type: "result"`.
     * - **Legacy** (CLI ≤ 2.1.31): A single JSON object (possibly preceded
     *   by non-JSON text).
     *
     * @param stdout - Raw stdout from the CLI process
     * @returns The JSON string for the result object, or `undefined` if not found
     */
    private extractResultJson;
    /**
     * Get user-facing install instructions for the Claude CLI.
     */
    getInstallInstructions(): string;
}
//# sourceMappingURL=claude.d.ts.map