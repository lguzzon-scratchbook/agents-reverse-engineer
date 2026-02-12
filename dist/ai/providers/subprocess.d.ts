/**
 * Subprocess-based AI provider.
 *
 * Wraps an {@link AIBackend} to implement the {@link AIProvider} interface
 * by spawning CLI subprocesses. This is the default provider used by the
 * CLI commands and preserves the existing behavior exactly.
 *
 * @module
 */
import type { AIProvider, AIBackend, AICallOptions, AIResponse } from '../types.js';
import type { ITraceWriter } from '../../orchestration/trace.js';
import type { Logger } from '../../core/logger.js';
/**
 * Options for the subprocess provider.
 */
export interface SubprocessProviderOptions {
    /** Default subprocess timeout in milliseconds */
    timeoutMs: number;
    /** Whether debug mode is enabled */
    debug?: boolean;
    /** Logger for debug/warn output */
    logger?: Logger;
    /** Trace writer for subprocess events */
    tracer?: ITraceWriter | null;
}
/**
 * AI provider that spawns CLI subprocesses via an {@link AIBackend}.
 *
 * This is the provider used by existing CLI commands. It preserves the
 * exact subprocess spawning, timeout enforcement, rate-limit detection,
 * and response parsing behavior.
 *
 * @example
 * ```typescript
 * import { SubprocessProvider } from './providers/subprocess.js';
 * import { ClaudeBackend } from '../backends/claude.js';
 *
 * const provider = new SubprocessProvider(new ClaudeBackend(), {
 *   timeoutMs: 120_000,
 * });
 * const response = await provider.call({ prompt: 'Hello' });
 * ```
 */
export declare class SubprocessProvider implements AIProvider {
    readonly backend: AIBackend;
    private readonly timeoutMs;
    private readonly debug;
    private readonly log;
    private tracer;
    /** Number of currently active subprocesses (for debug logging) */
    private activeCount;
    /** Directory for subprocess output logs (null = disabled) */
    private subprocessLogDir;
    /** Serializes log writes so concurrent workers don't interleave mkdirs */
    private logWriteQueue;
    constructor(backend: AIBackend, options: SubprocessProviderOptions);
    /**
     * Set the trace writer (allows late binding after construction).
     */
    setTracer(tracer: ITraceWriter): void;
    /**
     * Set a directory for writing subprocess stdout/stderr log files.
     */
    setSubprocessLogDir(dir: string): void;
    call(options: AICallOptions): Promise<AIResponse>;
    /**
     * Enqueue a subprocess output log write.
     *
     * Serializes writes via a promise chain to avoid concurrent mkdir races.
     * Failures are silently swallowed -- log writing is non-critical.
     */
    private enqueueSubprocessLog;
}
//# sourceMappingURL=subprocess.d.ts.map