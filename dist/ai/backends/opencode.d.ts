/**
 * OpenCode CLI backend adapter.
 *
 * Full implementation of the {@link AIBackend} interface for the OpenCode CLI
 * (`opencode`). Parses NDJSON streaming output, aggregates token usage across
 * turns, calculates cost when not provided, and extracts response text from
 * `text` events.
 *
 * OpenCode outputs NDJSON (one JSON event per line) with key event types:
 * - `text`: assistant text output (`part.text`)
 * - `step_finish`: per-turn token usage and cost (`part.tokens`, `part.cost`)
 * - `step_start`, `tool_use`, `tool_result`: other lifecycle events (ignored)
 *
 * @module
 */
import type { AIBackend, AICallOptions, AIResponse } from '../types.js';
/**
 * OpenCode CLI backend adapter.
 *
 * Implements the {@link AIBackend} interface for the `opencode` CLI.
 * Parses NDJSON streaming output, aggregates tokens across turns,
 * and calculates cost when not provided by the CLI.
 *
 * @example
 * ```typescript
 * const backend = new OpenCodeBackend();
 * if (await backend.isAvailable()) {
 *   const args = backend.buildArgs({ prompt: 'Summarize this file' });
 *   const result = await runSubprocess('opencode', args, {
 *     timeoutMs: 120_000,
 *     input: 'Summarize this file',
 *   });
 *   const response = backend.parseResponse(result.stdout, result.durationMs, result.exitCode);
 * }
 * ```
 */
export declare class OpenCodeBackend implements AIBackend {
    readonly name = "opencode";
    readonly cliCommand = "opencode";
    /**
     * Check if the `opencode` CLI is available on PATH.
     */
    isAvailable(): Promise<boolean>;
    /**
     * Build CLI arguments for an OpenCode invocation.
     *
     * Returns the argument array for `opencode run --format json`. The
     * prompt itself is NOT included — it goes to stdin via the subprocess
     * wrapper.
     *
     * OpenCode limitations compared to Claude CLI:
     * - No `--max-turns` equivalent (mitigated via agent `steps: 1`)
     * - No `--allowedTools` equivalent (mitigated via agent `tools: {"*": false}`)
     * - No `--system-prompt` equivalent (mitigated via {@link composeStdinInput})
     * - No `--no-session-persistence` equivalent
     *
     * @param options - Call options (model selection supported)
     * @returns Argument array suitable for {@link runSubprocess}
     */
    buildArgs(options: AICallOptions): string[];
    /**
     * Compose stdin input, folding the system prompt into the payload.
     *
     * OpenCode has no `--system-prompt` CLI flag, so the dynamic system
     * prompt is wrapped in `<system-instructions>` XML tags and prepended
     * to the user prompt. The static agent prompt (in the agent markdown
     * file) instructs the model to follow these tags.
     */
    composeStdinInput(options: AICallOptions): string;
    /**
     * Ensure the ARE agent config exists in the target project.
     *
     * Creates `.opencode/agents/are-summarizer.md` with tool restrictions
     * (`"*": false`) and step limit (`steps: 5`) so OpenCode runs in
     * a constrained, non-agentic mode when invoked by ARE.
     *
     * Always overwrites — the file is an ARE-owned artifact whose content
     * may evolve across versions.
     */
    ensureProjectConfig(projectRoot: string): Promise<void>;
    /**
     * Parse OpenCode CLI NDJSON output into a normalized {@link AIResponse}.
     *
     * OpenCode emits NDJSON (one JSON object per line) with no single "result"
     * summary object (unlike Claude CLI). The response text is spread across
     * multiple `text` events, and token usage is in `step_finish` events.
     *
     * Parsing strategy:
     * 1. Split stdout by newlines, filter empty lines
     * 2. Parse each line as JSON (skip malformed lines gracefully)
     * 3. Collect `text` events → concatenate `part.text` for final response
     * 4. Collect `step_finish` events → aggregate tokens across all turns
     * 5. If aggregated cost === 0, calculate from token counts
     * 6. Return AIResponse with aggregated metrics
     *
     * @param stdout - Raw NDJSON stdout from the OpenCode CLI process
     * @param durationMs - Wall-clock duration of the subprocess
     * @param exitCode - Process exit code
     * @returns Normalized AI response
     * @throws {AIServiceError} With code `PARSE_ERROR` if no text content found
     */
    parseResponse(stdout: string, durationMs: number, exitCode: number): AIResponse;
    /**
     * Parse NDJSON stdout into aggregated metrics.
     *
     * Each line is parsed independently. Malformed lines are skipped
     * gracefully to handle partial output from killed processes or
     * interleaved stderr.
     *
     * @param stdout - Raw NDJSON output from OpenCode CLI
     * @returns Aggregated metrics from all parsed events
     */
    private parseNdjson;
    /**
     * Get user-facing install instructions for the OpenCode CLI.
     */
    getInstallInstructions(): string;
}
//# sourceMappingURL=opencode.d.ts.map