/**
 * Update module
 *
 * Provides incremental documentation update functionality.
 * Coordinates state management, change detection, and orphan cleanup.
 */
export { DocumentationOrchestrator as UpdateOrchestrator, createUpdateOrchestrator, } from '../orchestration/orchestrator.js';
export { cleanupOrphans, cleanupEmptyDirectoryDocs, getAffectedDirectories, } from './orphan-cleaner.js';
//# sourceMappingURL=index.js.map