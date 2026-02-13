/**
 * Low-level subprocess wrapper for AI CLI invocations.
 *
 * This is the ONLY place in the codebase that spawns AI CLI processes.
 * Centralizes timeout enforcement, stdin piping, zombie prevention,
 * SIGKILL escalation, and exit code extraction.
 *
 * @module
 */
import type { SubprocessResult } from './types.js';
/**
 * Get current count of active subprocesses.
 */
export declare function getActiveSubprocessCount(): number;
/**
 * Get details of all active subprocesses.
 */
export declare function getActiveSubprocesses(): Array<{
    pid: number;
    command: string;
    spawnedAt: number;
    runningMs: number;
}>;
/**
 * Options for subprocess execution.
 */
export interface SubprocessOptions {
    /** Maximum time in milliseconds before the process is killed */
    timeoutMs: number;
    /** Optional stdin input to pipe to the process */
    input?: string;
    /** Optional environment variable overrides for the child process */
    env?: NodeJS.ProcessEnv;
    /**
     * Callback fired synchronously when the child process is spawned.
     * Use this for trace events that need the actual spawn time.
     */
    onSpawn?: (pid: number | undefined) => void;
}
/**
 * Spawn a CLI subprocess with timeout enforcement and stdin piping.
 *
 * Always resolves -- never rejects. Errors are captured in the returned
 * {@link SubprocessResult} fields (`exitCode`, `timedOut`, `stderr`) so
 * that callers can decide how to handle failures.
 *
 * When the subprocess exceeds its timeout, `execFile` sends SIGTERM.
 * If the process doesn't exit within {@link SIGKILL_GRACE_MS} after
 * SIGTERM, we escalate to SIGKILL to prevent hung processes from
 * lingering indefinitely.
 *
 * @param command - The CLI executable to run (e.g., "claude", "gemini")
 * @param args - Argument array passed to the executable
 * @param options - Timeout, optional stdin input, and spawn callback
 * @returns Resolved result with stdout, stderr, exit code, timing, and timeout flag
 *
 * @example
 * ```typescript
 * import { runSubprocess } from './subprocess.js';
 *
 * const result = await runSubprocess('claude', ['-p', '--output-format', 'json'], {
 *   timeoutMs: 120_000,
 *   input: 'Summarize this codebase',
 *   onSpawn: (pid) => console.log(`Spawned PID ${pid}`),
 * });
 *
 * if (result.timedOut) {
 *   console.error('CLI timed out after 120s');
 * } else if (result.exitCode !== 0) {
 *   console.error('CLI failed:', result.stderr);
 * } else {
 *   const response = JSON.parse(result.stdout);
 * }
 * ```
 */
export declare function runSubprocess(command: string, args: string[], options: SubprocessOptions): Promise<SubprocessResult>;
//# sourceMappingURL=subprocess.d.ts.map