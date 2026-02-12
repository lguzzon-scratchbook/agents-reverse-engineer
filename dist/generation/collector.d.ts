/**
 * A collected AGENTS.md document with its project-relative path and content.
 */
export type AgentsDocs = Array<{
    relativePath: string;
    content: string;
}>;
/**
 * Recursively collect all AGENTS.md files under `projectRoot`,
 * returning their relative paths and content sorted alphabetically.
 *
 * Skips vendor/build/meta directories and gracefully handles
 * unreadable directories or files.
 */
export declare function collectAgentsDocs(projectRoot: string): Promise<AgentsDocs>;
/**
 * Recursively collect all `.annex.sum` files under `projectRoot`,
 * returning their relative paths and content sorted alphabetically.
 *
 * Uses the same skip-list as `collectAgentsDocs()`.
 */
export declare function collectAnnexFiles(projectRoot: string): Promise<AgentsDocs>;
//# sourceMappingURL=collector.d.ts.map