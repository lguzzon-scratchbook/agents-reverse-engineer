/**
 * Checkpoint manager for rebuild session continuity.
 *
 * Persists per-module completion status and spec file hashes inside the
 * output directory. Uses promise-chain write serialization (same pattern
 * as PlanTracker) to handle concurrent pool worker updates safely.
 *
 * @module
 */
import { type RebuildCheckpoint } from './types.js';
/**
 * Manages rebuild checkpoint state for session continuity.
 *
 * Create via the static `load()` or `createFresh()` factory methods.
 * Call `markDone()` / `markFailed()` as modules complete, and `flush()`
 * before returning to ensure all writes finish.
 */
export declare class CheckpointManager {
    private data;
    private readonly checkpointPath;
    private writeQueue;
    constructor(outputDir: string, initialData: RebuildCheckpoint);
    /**
     * Load an existing checkpoint or create a new one.
     *
     * If a checkpoint file exists and is valid, checks for spec drift by
     * comparing stored hashes against current spec file content hashes.
     * Returns `isResume: true` only if the checkpoint is valid and specs
     * haven't changed.
     *
     * @param outputDir - Absolute path to the output directory
     * @param specFiles - Current spec files with content for drift detection
     * @param unitNames - Names of all rebuild units (for fresh checkpoint initialization)
     * @returns CheckpointManager instance and whether this is a resume
     */
    static load(outputDir: string, specFiles: Array<{
        relativePath: string;
        content: string;
    }>, unitNames: string[]): Promise<{
        manager: CheckpointManager;
        isResume: boolean;
    }>;
    /**
     * Create a fresh checkpoint with all modules set to pending.
     *
     * @param outputDir - Absolute path to the output directory
     * @param specFiles - Spec files with content for hash computation
     * @param unitNames - Names of all rebuild units
     * @returns New CheckpointManager instance
     */
    static createFresh(outputDir: string, specFiles: Array<{
        relativePath: string;
        content: string;
    }>, unitNames: string[]): CheckpointManager;
    /**
     * Mark a unit as successfully completed.
     *
     * Queues a serialized write to the checkpoint file.
     */
    markDone(unitName: string, filesWritten: string[]): void;
    /**
     * Mark a unit as failed.
     *
     * Queues a serialized write to the checkpoint file.
     */
    markFailed(unitName: string, error: string): void;
    /**
     * Get names of units that are pending or failed (eligible for execution).
     */
    getPendingUnits(): string[];
    /**
     * Check if a unit has been completed.
     */
    isDone(unitName: string): boolean;
    /**
     * Wait for all queued writes to finish.
     */
    flush(): Promise<void>;
    /**
     * Create the output directory if needed and write the initial checkpoint file.
     */
    initialize(): Promise<void>;
    /**
     * Return the current checkpoint data (for dry-run display or inspection).
     */
    getData(): RebuildCheckpoint;
    /**
     * Queue a serialized write to prevent file corruption from concurrent calls.
     *
     * Follows the PlanTracker promise-chain pattern.
     */
    private queueWrite;
}
//# sourceMappingURL=checkpoint.d.ts.map