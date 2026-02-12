/**
 * Retry utility with exponential backoff for transient AI service failures.
 *
 * Wraps any async operation with configurable retry logic. Uses exponential
 * delays with jitter to prevent thundering herd when multiple callers hit
 * the same rate limit.
 *
 * @module
 */
import type { RetryOptions } from './types.js';
/**
 * Default retry configuration values.
 *
 * Does NOT include `isRetryable` or `onRetry` since those are
 * caller-specific. Spread these defaults and provide your own predicates:
 *
 * @example
 * ```typescript
 * import { withRetry, DEFAULT_RETRY_OPTIONS } from './retry.js';
 * import { AIServiceError } from './types.js';
 *
 * const result = await withRetry(() => callAI(prompt), {
 *   ...DEFAULT_RETRY_OPTIONS,
 *   isRetryable: (err) => err instanceof AIServiceError && err.code === 'RATE_LIMIT',
 *   onRetry: (attempt, err) => console.warn(`Retry ${attempt}:`, err),
 * });
 * ```
 */
export declare const DEFAULT_RETRY_OPTIONS: {
    /** Maximum number of retries (3 retries = 4 total attempts) */
    readonly maxRetries: 3;
    /** Base delay before first retry: 1 second */
    readonly baseDelayMs: 1000;
    /** Maximum delay cap: 8 seconds */
    readonly maxDelayMs: 8000;
    /** Exponential multiplier: delay doubles each attempt */
    readonly multiplier: 2;
};
/**
 * Execute an async function with exponential backoff retry on failure.
 *
 * - On success: returns the result immediately.
 * - On transient failure (isRetryable returns true): waits with exponential
 *   backoff + jitter, then retries up to `maxRetries` times.
 * - On permanent failure (isRetryable returns false): throws immediately
 *   without retrying.
 * - After exhausting all retries: throws the last error.
 *
 * Delay formula: `min(baseDelayMs * multiplier^attempt, maxDelayMs) + jitter`
 * where jitter is a random value in [0, 500ms].
 *
 * @typeParam T - The return type of the wrapped function
 * @param fn - Async function to execute (and potentially retry)
 * @param options - Retry configuration including backoff timing and predicates
 * @returns The result of a successful `fn()` invocation
 * @throws The last error if all retry attempts are exhausted or if the error is not retryable
 *
 * @example
 * ```typescript
 * import { withRetry } from './retry.js';
 *
 * // Retry up to 3 times on rate limit errors
 * const response = await withRetry(
 *   () => runAICall(prompt),
 *   {
 *     maxRetries: 3,
 *     baseDelayMs: 1000,
 *     maxDelayMs: 8000,
 *     multiplier: 2,
 *     isRetryable: (err) => isRateLimitError(err),
 *     onRetry: (attempt, err) => logger.warn(`Attempt ${attempt} failed, retrying...`),
 *   },
 * );
 * ```
 */
export declare function withRetry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T>;
//# sourceMappingURL=retry.d.ts.map