/**
 * AI service orchestrator.
 *
 * The {@link AIService} class is the main entry point for making AI calls.
 * It wraps any {@link AIProvider} with retry logic, telemetry recording,
 * and optional subprocess log writing.
 *
 * For CLI usage, pass an {@link AIBackend} which is auto-wrapped in a
 * {@link SubprocessProvider}. For library usage, pass any custom
 * {@link AIProvider} implementation directly.
 *
 * @module
 */
import type { AIBackend, AIProvider, AICallOptions, AIResponse, RunLog, FileRead } from './types.js';
import type { ITraceWriter } from '../orchestration/trace.js';
import type { Logger } from '../core/logger.js';
/**
 * Configuration options for the {@link AIService}.
 *
 * These are typically sourced from the config schema's `ai` section.
 */
export interface AIServiceOptions {
    /** Default subprocess timeout in milliseconds */
    timeoutMs: number;
    /** Maximum number of retries for transient errors */
    maxRetries: number;
    /** Default model identifier (e.g., "sonnet", "opus") applied to all calls unless overridden per-call */
    model?: string;
    /** Command that triggered this run (e.g., "generate", "update", "specify", "rebuild") */
    command: string;
    /** Telemetry settings */
    telemetry: {
        /** Number of most recent run logs to keep on disk */
        keepRuns: number;
    };
}
/**
 * Orchestrates AI calls with retry, timeout, and telemetry.
 *
 * Wraps any {@link AIProvider} with retry logic and telemetry recording.
 * Create one instance per run. Call {@link call} for each AI invocation.
 * Call {@link finalize} at the end to write the run log.
 *
 * @example
 * ```typescript
 * // CLI usage (backward compatible): pass AIBackend directly
 * import { AIService } from './service.js';
 * import { resolveBackend, createBackendRegistry } from './registry.js';
 *
 * const backend = await resolveBackend(createBackendRegistry(), 'auto');
 * const service = new AIService(backend, {
 *   timeoutMs: 120_000,
 *   maxRetries: 3,
 *   telemetry: { keepRuns: 10 },
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Library usage: pass custom AIProvider
 * import { AIService } from './service.js';
 * import type { AIProvider } from './types.js';
 *
 * const provider: AIProvider = new MyCustomProvider();
 * const service = new AIService(provider, {
 *   timeoutMs: 120_000,
 *   maxRetries: 3,
 *   telemetry: { keepRuns: 10 },
 * });
 * ```
 */
export declare class AIService {
    /** The provider used for AI calls */
    private readonly provider;
    /** Service configuration */
    private readonly options;
    /** In-memory telemetry logger for this run */
    private readonly logger;
    /** Running count of calls made (used for entry tracking) */
    private callCount;
    /** Trace writer for retry event tracing */
    private tracer;
    /** Whether debug mode is enabled */
    private debug;
    /** Directory for subprocess output logs (null = disabled) */
    private subprocessLogDir;
    /** Serializes log writes so concurrent workers don't interleave mkdirs */
    private logWriteQueue;
    /** Debug/warn/error logger (injected; defaults to silent) */
    private readonly log;
    /** Backend reference kept for subprocess log writing (null when using custom provider) */
    private readonly backend;
    /**
     * Create a new AI service instance.
     *
     * Accepts either an {@link AIBackend} (auto-wrapped in {@link SubprocessProvider})
     * or a custom {@link AIProvider} implementation.
     *
     * @param providerOrBackend - An AIProvider or AIBackend
     * @param options - Service configuration (timeout, retries, telemetry)
     * @param debugLogger - Optional debug logger (defaults to nullLogger)
     */
    constructor(providerOrBackend: AIProvider | AIBackend, options: AIServiceOptions, debugLogger?: Logger);
    /**
     * Set the trace writer for retry event tracing.
     *
     * If the provider is a {@link SubprocessProvider}, also sets the tracer
     * on it for subprocess spawn/exit events.
     *
     * @param tracer - The trace writer instance
     */
    setTracer(tracer: ITraceWriter): void;
    /**
     * Enable debug mode for verbose subprocess logging to stderr.
     */
    setDebug(enabled: boolean): void;
    /**
     * Set a directory for writing subprocess stdout/stderr log files.
     *
     * When set, each subprocess invocation writes a `.log` file containing
     * the metadata header, stdout, and stderr. Useful for diagnosing
     * timed-out or failed subprocesses whose output would otherwise be lost.
     *
     * @param dir - Absolute path to the log directory (created on first write)
     */
    setSubprocessLogDir(dir: string): void;
    /**
     * Make an AI call with retry logic and telemetry recording.
     *
     * The call flow:
     * 1. Merge service-level model default
     * 2. Delegate to the provider with retry wrapping
     * 3. On success: record telemetry entry
     * 4. On failure: record error telemetry entry, throw the error
     *
     * Retries are attempted for `RATE_LIMIT` errors only.
     *
     * @param options - The call options (prompt, model, timeout, etc.)
     * @returns The normalized AI response
     * @throws {AIServiceError} On timeout, rate limit exhaustion, parse error, or subprocess failure
     */
    call(options: AICallOptions): Promise<AIResponse>;
    /**
     * Finalize the run: write the run log to disk and clean up old files.
     *
     * Call this once at the end of a CLI invocation, after all `call()`
     * invocations have completed (or failed).
     *
     * @param projectRoot - Absolute path to the project root directory
     * @returns The log file path and the run summary
     */
    finalize(projectRoot: string): Promise<{
        logPath: string;
        summary: RunLog['summary'];
    }>;
    /**
     * Attach file-read metadata to the most recent telemetry entry.
     *
     * Called by the command runner after an AI call completes, to record
     * which source files were sent as context for that call.
     *
     * @param filesRead - Array of file-read records (path + size)
     */
    addFilesReadToLastEntry(filesRead: FileRead[]): void;
    /**
     * Get the current run summary without finalizing.
     *
     * Useful for displaying progress during a run.
     *
     * @returns Current summary statistics
     */
    getSummary(): RunLog['summary'];
}
//# sourceMappingURL=service.d.ts.map