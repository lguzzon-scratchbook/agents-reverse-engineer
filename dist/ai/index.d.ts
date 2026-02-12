/**
 * Public API for the AI service layer.
 *
 * This barrel export is the ONLY import point for the AI service layer.
 * No other module should reach into `src/ai/backends/` or `src/ai/telemetry/`
 * directly.
 *
 * @module
 *
 * @example
 * ```typescript
 * import {
 *   AIService,
 *   createBackendRegistry,
 *   resolveBackend,
 * } from './ai/index.js';
 *
 * const registry = createBackendRegistry();
 * const backend = await resolveBackend(registry, 'auto');
 * const service = new AIService(backend, {
 *   timeoutMs: 120_000,
 *   maxRetries: 3,
 *   telemetry: { keepRuns: 10 },
 * });
 *
 * const response = await service.call({ prompt: 'Hello' });
 * ```
 */
export type { AIProvider, AIBackend, AIResponse, AICallOptions, SubprocessResult, RetryOptions, TelemetryEntry, RunLog, FileRead, } from './types.js';
export { AIServiceError } from './types.js';
export { AIService } from './service.js';
export type { AIServiceOptions } from './service.js';
export { BackendRegistry, createBackendRegistry, resolveBackend, detectBackend, getInstallInstructions, } from './registry.js';
export { withRetry, DEFAULT_RETRY_OPTIONS } from './retry.js';
export { runSubprocess } from './subprocess.js';
export { SubprocessProvider } from './providers/subprocess.js';
export type { SubprocessProviderOptions } from './providers/subprocess.js';
export { isCommandOnPath } from './backends/claude.js';
//# sourceMappingURL=index.d.ts.map