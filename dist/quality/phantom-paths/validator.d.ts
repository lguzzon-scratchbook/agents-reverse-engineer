import type { PhantomPathInconsistency } from '../types.js';
/**
 * Check an AGENTS.md file for phantom path references.
 *
 * Extracts all path-like strings from the document, resolves them
 * relative to the AGENTS.md file location, and verifies they exist.
 *
 * @param agentsMdPath - Absolute path to the AGENTS.md file
 * @param content - Content of the AGENTS.md file
 * @param projectRoot - Project root for resolving src/ paths
 * @returns Array of phantom path inconsistencies
 */
export declare function checkPhantomPaths(agentsMdPath: string, content: string, projectRoot: string): PhantomPathInconsistency[];
//# sourceMappingURL=validator.d.ts.map