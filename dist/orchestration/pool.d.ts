/**
 * Iterator-based concurrency pool.
 *
 * Provides a zero-dependency concurrency limiter using the shared-iterator
 * worker pattern. Workers pull from a shared iterator so exactly N tasks
 * execute concurrently, with new tasks starting as previous ones complete.
 *
 * This avoids the "batch" anti-pattern where `Promise.all` on chunks of N
 * tasks idles workers while waiting for the slowest task in each batch.
 *
 * @module
 */
import type { ITraceWriter } from './trace.js';
/**
 * Options for the concurrency pool.
 */
export interface PoolOptions {
    /** Maximum number of concurrent workers */
    concurrency: number;
    /** Stop pulling new tasks on first error */
    failFast?: boolean;
    /** Trace writer for concurrency debugging (no-op when tracing is off) */
    tracer?: ITraceWriter;
    /** Phase label for trace events (e.g., 'phase-1-files') */
    phaseLabel?: string;
    /** Labels for each task by index (e.g., file paths). Used in trace events. */
    taskLabels?: string[];
}
/**
 * Result of a single task execution within the pool.
 *
 * Indexed by the task's position in the original array so callers
 * can correlate results back to their inputs.
 */
export interface TaskResult<T> {
    /** Zero-based index of the task in the original array */
    index: number;
    /** Whether the task completed successfully */
    success: boolean;
    /** The resolved value (present when success is true) */
    value?: T;
    /** The error (present when success is false) */
    error?: Error;
}
/**
 * Run an array of async task factories through a concurrency-limited pool.
 *
 * Uses the shared-iterator pattern: all workers iterate over the same
 * `entries()` iterator, so each task is picked up by exactly one worker.
 * When a worker finishes a task, it immediately pulls the next one from
 * the iterator, keeping all worker slots busy.
 *
 * @typeParam T - The resolved type of each task
 * @param tasks - Array of zero-argument async functions to execute
 * @param options - Pool configuration (concurrency, failFast, tracing)
 * @param onComplete - Optional callback invoked after each task settles
 * @returns Array of results indexed by original task position (may be sparse if aborted)
 *
 * @example
 * ```typescript
 * const results = await runPool(
 *   urls.map(url => () => fetch(url).then(r => r.json())),
 *   { concurrency: 5, failFast: false },
 *   (result) => console.log(`Task ${result.index}: ${result.success}`),
 * );
 * ```
 */
export declare function runPool<T>(tasks: Array<() => Promise<T>>, options: PoolOptions, onComplete?: (result: TaskResult<T>) => void): Promise<TaskResult<T>[]>;
//# sourceMappingURL=pool.d.ts.map