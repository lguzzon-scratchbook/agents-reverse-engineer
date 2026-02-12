/**
 * Public API for the quality analysis module.
 *
 * Re-exports all quality analysis types and functions from the
 * inconsistency detection and density validation submodules.
 *
 * @module
 */
export type { InconsistencySeverity, CodeDocInconsistency, CodeCodeInconsistency, PhantomPathInconsistency, Inconsistency, InconsistencyReport, } from './types.js';
export { extractExports, checkCodeVsDoc } from './inconsistency/code-vs-doc.js';
export { checkCodeVsCode } from './inconsistency/code-vs-code.js';
export { buildInconsistencyReport, formatReportForCli, formatReportAsMarkdown } from './inconsistency/reporter.js';
export { checkPhantomPaths } from './phantom-paths/index.js';
//# sourceMappingURL=index.d.ts.map