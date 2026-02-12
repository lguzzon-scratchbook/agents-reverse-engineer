/**
 * Rebuild execution orchestrator.
 *
 * Standalone async function that wires together the spec reader, checkpoint
 * manager, AI service, concurrency pool, and progress reporter into a
 * working rebuild pipeline. Processes rebuild units grouped by order value:
 * all units in a group run concurrently via runPool, and groups execute
 * sequentially to respect ordering dependencies.
 *
 * After each order group completes, exported type signatures are extracted
 * from the generated files and accumulated as context for subsequent groups.
 *
 * @module
 */
import type { AIService } from '../ai/index.js';
import { type ProgressLog, type ITraceWriter } from '../orchestration/index.js';
/**
 * Options for the rebuild execution pipeline.
 */
export interface RebuildExecutionOptions {
    /** Absolute path to the output directory */
    outputDir: string;
    /** Maximum concurrent AI calls within each order group */
    concurrency: number;
    /** Stop on first failure */
    failFast?: boolean;
    /** Wipe output directory and start fresh */
    force?: boolean;
    /** Enable verbose debug logging */
    debug?: boolean;
    /** Trace writer for concurrency debugging */
    tracer?: ITraceWriter;
    /** Progress log for tail -f monitoring */
    progressLog?: ProgressLog;
}
/**
 * Execute the rebuild pipeline.
 *
 * Reads spec files, partitions into units, loads/creates checkpoint,
 * processes units grouped by order value (sequential groups, concurrent
 * within each group), accumulates built context, and returns summary.
 *
 * @param aiService - Configured AI service instance
 * @param projectRoot - Absolute path to the project root
 * @param options - Rebuild execution options
 * @returns Summary with counts of processed, failed, and skipped modules
 */
export declare function executeRebuild(aiService: AIService, projectRoot: string, options: RebuildExecutionOptions): Promise<{
    modulesProcessed: number;
    modulesFailed: number;
    modulesSkipped: number;
}>;
//# sourceMappingURL=orchestrator.d.ts.map