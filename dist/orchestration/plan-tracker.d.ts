/**
 * Progress tracker that updates GENERATION-PLAN.md checkboxes during generation.
 *
 * Maintains the markdown content in memory for fast updates and serializes
 * disk writes via a promise chain to handle concurrent Phase 1 completions.
 *
 * @module
 */
/**
 * Tracks generation progress by ticking checkboxes in GENERATION-PLAN.md.
 *
 * Create one instance at the start of `executeGenerate()`, call `markDone()`
 * as tasks complete, and `flush()` before returning.
 */
export declare class PlanTracker {
    private content;
    private readonly planPath;
    private writeQueue;
    constructor(projectRoot: string, initialMarkdown: string);
    /** Write the initial plan file to disk. */
    initialize(): Promise<void>;
    /**
     * Mark a task as done by replacing its checkbox.
     *
     * The caller must pass the exact path as it appears in the markdown:
     * - File: `src/cli/init.ts`
     * - Directory: `src/cli/AGENTS.md`  (caller appends `/AGENTS.md`)
     * - Pointer: `CLAUDE.md`
     */
    markDone(itemPath: string): void;
    /** Wait for all queued writes to finish. */
    flush(): Promise<void>;
}
//# sourceMappingURL=plan-tracker.d.ts.map