/**
 * Write a CLAUDE.md file that imports the companion AGENTS.md via @ reference.
 * If a user-authored CLAUDE.md already exists (no marker), rename it to
 * CLAUDE.local.md and add an @CLAUDE.local.md import to preserve user content.
 * No AI call needed — this is a deterministic template.
 */
export declare function writeClaudeMdPointer(dirAbsolutePath: string): Promise<string>;
//# sourceMappingURL=claude-md.d.ts.map