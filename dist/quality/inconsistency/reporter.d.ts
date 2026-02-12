/**
 * Structured report builder and CLI formatter for inconsistency results.
 *
 * Aggregates individual inconsistency issues into a typed report with
 * summary counts, and formats the report as human-readable plain text
 * for CLI output. No color dependencies -- the reporter stays pure
 * so it can be tested easily.
 */
import type { Inconsistency, InconsistencyReport } from '../types.js';
/**
 * Build a structured inconsistency report from a list of issues.
 *
 * Computes summary counts by type (code-vs-doc, code-vs-code) and
 * severity (error, warning, info). Attaches run metadata including
 * timestamp, project root, files checked, and duration.
 *
 * @param issues - All detected inconsistencies
 * @param metadata - Run context (projectRoot, filesChecked, durationMs)
 * @returns Structured report with issues and summary counts
 */
export declare function buildInconsistencyReport(issues: Inconsistency[], metadata: {
    projectRoot: string;
    filesChecked: number;
    durationMs: number;
}): InconsistencyReport;
/**
 * Format an inconsistency report as human-readable plain text.
 *
 * Output format:
 * ```
 * === Inconsistency Report ===
 * Checked 42 files in 150ms
 * Found 3 issue(s)
 *
 * [ERROR] Documentation out of sync: 2 exports undocumented, 1 ...
 *   File: src/foo/bar.ts
 *
 * [WARN] Symbol "Config" exported from 2 files
 *   Files: src/config/a.ts, src/config/b.ts
 * ```
 *
 * Uses plain text only (no picocolors). Color can be added by the
 * CLI layer if needed.
 *
 * @param report - The structured inconsistency report
 * @returns Formatted string for stderr output
 */
export declare function formatReportForCli(report: InconsistencyReport): string;
/**
 * Format an inconsistency report as GitHub-flavored Markdown.
 *
 * Suitable for PR comments, issue bodies, or documentation files.
 *
 * @param report - The structured inconsistency report
 * @returns Markdown-formatted string
 */
export declare function formatReportAsMarkdown(report: InconsistencyReport): string;
//# sourceMappingURL=reporter.d.ts.map