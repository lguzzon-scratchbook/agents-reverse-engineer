/**
 * Run log writer for AI telemetry.
 *
 * Writes a completed {@link RunLog} to disk as pretty-printed JSON.
 * Each run produces a single file in `.agents-reverse-engineer/logs/`
 * with a filename derived from the run's start timestamp.
 *
 * @module
 */
import type { RunLog } from '../types.js';
/**
 * Write a completed run log to disk as pretty-printed JSON.
 *
 * Creates the logs directory if it does not exist. The filename is derived
 * from the run's command, backend, model, and startTime fields with `:` and `.`
 * replaced by `-` so that it forms a valid filename on all platforms.
 *
 * @param projectRoot - Absolute path to the project root directory
 * @param runLog - The completed run log to write
 * @returns Absolute path to the written file
 *
 * @example
 * ```typescript
 * const logPath = await writeRunLog('/home/user/project', runLog);
 * // logPath: /home/user/project/.agents-reverse-engineer/logs/run-generate-claude-sonnet-2026-02-07T12-00-00-000Z.json
 * ```
 */
export declare function writeRunLog(projectRoot: string, runLog: RunLog): Promise<string>;
//# sourceMappingURL=run-log.d.ts.map