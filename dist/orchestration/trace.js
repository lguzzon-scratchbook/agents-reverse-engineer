/**
 * Concurrency tracing system for debugging task/subprocess lifecycle.
 *
 * Produces append-only NDJSON trace files in `.agents-reverse-engineer/traces/`
 * when the `--trace` CLI flag is set. When disabled, the {@link NullTraceWriter}
 * ensures zero overhead -- every call site can unconditionally call `emit()`
 * without branching.
 *
 * Uses promise-chain serialization (same pattern as {@link PlanTracker}) to
 * handle concurrent writes from multiple pool workers safely.
 *
 * @module
 */
import { open, mkdir, readdir, unlink } from 'node:fs/promises';
import * as path from 'node:path';
// ---------------------------------------------------------------------------
// Trace directory
// ---------------------------------------------------------------------------
/** Directory for trace files (relative to project root) */
const TRACES_DIR = '.agents-reverse-engineer/traces';
// ---------------------------------------------------------------------------
// NullTraceWriter (no-op)
// ---------------------------------------------------------------------------
/**
 * No-op trace writer. Returned when `--trace` is not set.
 * All methods are empty -- zero overhead at call sites.
 */
class NullTraceWriter {
    filePath = '';
    emit() { }
    async finalize() { }
}
// ---------------------------------------------------------------------------
// TraceWriter (real implementation)
// ---------------------------------------------------------------------------
/**
 * Append-only NDJSON trace writer.
 *
 * Each `emit()` call serializes the event to a single JSON line and
 * enqueues a file append via a promise chain. This guarantees correct
 * ordering even when multiple pool workers emit concurrently.
 */
class TraceWriter {
    filePath;
    seq = 0;
    nodePid = process.pid;
    startHr = process.hrtime.bigint();
    writeQueue = Promise.resolve();
    fd = null;
    constructor(filePath) {
        this.filePath = filePath;
    }
    emit(partial) {
        const event = {
            ...partial,
            seq: this.seq++,
            ts: new Date().toISOString(),
            pid: this.nodePid,
            elapsedMs: Number(process.hrtime.bigint() - this.startHr) / 1_000_000,
        };
        const line = JSON.stringify(event) + '\n';
        this.writeQueue = this.writeQueue
            .then(async () => {
            if (!this.fd) {
                await mkdir(path.dirname(this.filePath), { recursive: true });
                this.fd = await open(this.filePath, 'a');
            }
            await this.fd.write(line);
        })
            .catch(() => { });
    }
    async finalize() {
        await this.writeQueue;
        if (this.fd) {
            await this.fd.close();
            this.fd = null;
        }
    }
}
// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
/**
 * Create a trace writer.
 *
 * Returns a {@link NullTraceWriter} when `enabled` is false (zero overhead).
 * Otherwise returns a {@link TraceWriter} that appends NDJSON to
 * `.agents-reverse-engineer/traces/trace-{timestamp}.ndjson`.
 *
 * @param projectRoot - Absolute path to the project root directory
 * @param enabled - Whether tracing is enabled (typically from `--trace` flag)
 * @returns A trace writer instance
 */
export function createTraceWriter(projectRoot, enabled) {
    if (!enabled)
        return new NullTraceWriter();
    const safeTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(projectRoot, TRACES_DIR, `trace-${safeTimestamp}.ndjson`);
    return new TraceWriter(filePath);
}
// ---------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------
/**
 * Remove old trace files, keeping only the most recent ones.
 *
 * Mirrors the pattern in `src/ai/telemetry/cleanup.ts`.
 *
 * @param projectRoot - Absolute path to the project root directory
 * @param keepCount - Number of most recent trace files to retain (default: 500)
 * @returns Number of files deleted
 */
export async function cleanupOldTraces(projectRoot, keepCount = 500) {
    const tracesDir = path.join(projectRoot, TRACES_DIR);
    let entries;
    try {
        const allEntries = await readdir(tracesDir);
        entries = allEntries.filter((name) => name.startsWith('trace-') && name.endsWith('.ndjson'));
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return 0;
        }
        throw error;
    }
    // Sort newest first (ISO timestamps sort lexicographically)
    entries.sort();
    entries.reverse();
    const toDelete = entries.slice(keepCount);
    for (const filename of toDelete) {
        await unlink(path.join(tracesDir, filename));
    }
    return toDelete.length;
}
//# sourceMappingURL=trace.js.map