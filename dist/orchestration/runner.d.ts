/**
 * Two-phase command runner for AI-driven documentation generation.
 *
 * Wires together {@link AIService}, {@link ExecutionPlan}, the concurrency
 * pool, and the progress reporter into a cohesive execution engine.
 *
 * The two execution phases match the {@link ExecutionPlan} dependency graph:
 * 1. **File analysis** -- concurrent AI calls with configurable parallelism
 * 2. **Directory docs** -- concurrent per depth level, post-order AGENTS.md + companion CLAUDE.md generation
 *
 * @module
 */
import type { AIService } from '../ai/index.js';
import type { ExecutionPlan } from '../generation/executor.js';
import type { Config } from '../config/schema.js';
import type { RunSummary, CommandRunOptions } from './types.js';
/**
 * Orchestrates AI-driven documentation generation.
 *
 * Create one instance per command invocation. The runner holds references
 * to the AI service and run options, then executes plans or file lists
 * through the two-phase pipeline (file analysis, then directory aggregation).
 *
 * @example
 * ```typescript
 * const runner = new CommandRunner(aiService, {
 *   concurrency: 5,
 *   failFast: false,
 * });
 *
 * const summary = await runner.executeGenerate(plan);
 * console.log(`Processed ${summary.filesProcessed} files`);
 * ```
 */
export declare class CommandRunner {
    /** AI service instance for making calls */
    private readonly aiService;
    /** Command execution options */
    private readonly options;
    /** Trace writer for concurrency debugging */
    private readonly tracer;
    /**
     * Create a new command runner.
     *
     * @param aiService - The AI service instance (should be created per CLI run)
     * @param options - Execution options (concurrency, failFast, etc.)
     */
    constructor(aiService: AIService, options: CommandRunOptions);
    /** Progress log instance (if provided via options) for ProgressReporter mirroring */
    private get progressLog();
    /**
     * Execute the `generate` command using a pre-built execution plan.
     *
     * Runs two phases:
     * 1. File tasks concurrently through the pool
     * 2. Directory AGENTS.md + companion CLAUDE.md generation (post-order)
     *
     * @param plan - The execution plan from the generation orchestrator
     * @returns Aggregated run summary
     */
    executeGenerate(plan: ExecutionPlan, options?: {
        skippedFiles?: number;
        skippedDirs?: number;
    }): Promise<RunSummary>;
    /**
     * Execute the `update` command for a set of changed files.
     *
     * Runs only Phase 1 (file analysis) for the specified files. Does NOT
     * generate directory or root documents -- the update command handles
     * AGENTS.md regeneration itself based on which directories were affected.
     *
     * @param filesToAnalyze - Array of changed files to re-analyze
     * @param projectRoot - Absolute path to the project root
     * @param config - Project configuration for prompt building
     * @returns Aggregated run summary
     */
    executeUpdate(fileTasks: import('../orchestration/orchestrator.js').AnalysisTask[], projectRoot: string, config: Config): Promise<RunSummary>;
}
//# sourceMappingURL=runner.d.ts.map