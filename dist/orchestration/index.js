/**
 * Public API for the orchestration module.
 *
 * This barrel export is the single import point for the orchestration
 * engine. It re-exports the concurrency pool, progress reporter,
 * command runner, and all shared types.
 *
 * @module
 *
 * @example
 * ```typescript
 * import {
 *   CommandRunner,
 *   ProgressReporter,
 *   runPool,
 * } from './orchestration/index.js';
 *
 * const runner = new CommandRunner(aiService, { concurrency: 5 });
 * const summary = await runner.executeGenerate(plan);
 * ```
 */
// ---------------------------------------------------------------------------
// Concurrency pool
// ---------------------------------------------------------------------------
export { runPool } from './pool.js';
// ---------------------------------------------------------------------------
// Progress reporter
// ---------------------------------------------------------------------------
export { ProgressReporter, ProgressLog } from './progress.js';
// ---------------------------------------------------------------------------
// Plan tracker
// ---------------------------------------------------------------------------
export { PlanTracker } from './plan-tracker.js';
export { createTraceWriter, cleanupOldTraces } from './trace.js';
// ---------------------------------------------------------------------------
// Command runner
// ---------------------------------------------------------------------------
export { CommandRunner } from './runner.js';
//# sourceMappingURL=index.js.map