/**
 * Documentation orchestrator
 *
 * Unified orchestrator for both generation and incremental update workflows.
 * Combines functionality from GenerationOrchestrator and UpdateOrchestrator.
 */
import type { Config } from '../config/schema.js';
import type { DiscoveryResult } from '../types/index.js';
import type { Logger } from '../core/logger.js';
import type { ITraceWriter } from './trace.js';
import type { ComplexityMetrics } from '../generation/complexity.js';
import { type FileChange } from '../change-detection/index.js';
import type { UpdateOptions, CleanupResult } from '../update/types.js';
/**
 * A file prepared for analysis.
 */
export interface PreparedFile {
    /** Absolute path to the file */
    filePath: string;
    /** Relative path from project root */
    relativePath: string;
    /** File content */
    content: string;
}
/**
 * Analysis task for a file or directory.
 */
export interface AnalysisTask {
    /** Type of task */
    type: 'file' | 'directory';
    /** File or directory path */
    filePath: string;
    /** System prompt (set for file tasks; directory prompts built at execution time) */
    systemPrompt?: string;
    /** User prompt (set for file tasks; directory prompts built at execution time) */
    userPrompt?: string;
    /** Directory info for directory tasks */
    directoryInfo?: {
        /** Paths of .sum files in this directory */
        sumFiles: string[];
        /** Number of files analyzed */
        fileCount: number;
    };
}
/**
 * Result of the generation planning process.
 */
export interface GenerationPlan {
    /** Files to be analyzed (after skip filtering) */
    files: PreparedFile[];
    /** Analysis tasks to execute */
    tasks: AnalysisTask[];
    /** Complexity metrics */
    complexity: ComplexityMetrics;
    /** Compact project directory listing for bird's-eye context */
    projectStructure?: string;
    /** Files skipped due to existing .sum artifacts */
    skippedFiles?: string[];
    /** Directories skipped due to existing AGENTS.md with no dirty children */
    skippedDirs?: string[];
    /** All discovered files (before skip filtering, for directoryFileMap) */
    allDiscoveredFiles?: PreparedFile[];
}
/**
 * Result of update preparation (before analysis).
 */
export interface UpdatePlan {
    /** Files to analyze (added or modified) */
    filesToAnalyze: FileChange[];
    /** Pre-built analysis tasks with prompts (for unified execution) */
    fileTasks: AnalysisTask[];
    /** Files to skip (unchanged based on content hash) */
    filesToSkip: string[];
    /** Cleanup result (files to delete) */
    cleanup: CleanupResult;
    /** Directories that need AGENTS.md regeneration */
    affectedDirs: string[];
    /** Base commit (not used in frontmatter mode, kept for compatibility) */
    baseCommit: string;
    /** Current commit */
    currentCommit: string;
    /** Whether this is first run (no .sum files exist) */
    isFirstRun: boolean;
}
/**
 * Unified orchestrator for documentation generation and incremental updates.
 *
 * Provides methods for:
 * - Full project generation: createPlan() -> generates all docs
 * - Incremental updates: preparePlan() -> updates only changed files
 * - Shared task building: createFileTasks() -> builds prompts for both flows
 */
export declare class DocumentationOrchestrator {
    private config;
    private projectRoot;
    private tracer?;
    private debug;
    private logger;
    constructor(config: Config, projectRoot: string, options?: {
        tracer?: ITraceWriter;
        debug?: boolean;
        logger?: Logger;
    });
    /**
     * Prepare files for analysis by reading content and detecting types.
     */
    prepareFiles(discoveryResult: DiscoveryResult): Promise<PreparedFile[]>;
    /**
     * Build a compact project structure listing from prepared files.
     * Groups files by directory to give the AI bird's-eye context.
     */
    private buildProjectStructure;
    /**
     * Filter prepared files, removing those that already have .sum artifacts.
     */
    filterExistingFiles(files: PreparedFile[]): Promise<{
        filesToProcess: PreparedFile[];
        skippedFiles: string[];
    }>;
    /**
     * Mark a directory and all its ancestors as needing regeneration.
     */
    private markDirtyWithAncestors;
    /**
     * Filter directory tasks, keeping only directories that need regeneration.
     *
     * A directory needs regeneration if:
     * - It has no generated AGENTS.md, OR
     * - Any descendant file was processed in phase 1 (dirty propagation)
     */
    filterExistingDirectories(allFiles: PreparedFile[], processedFiles: PreparedFile[]): Promise<{
        dirsToProcess: Set<string>;
        skippedDirs: string[];
    }>;
    /**
     * Create directory tasks for LLM-generated directory descriptions.
     * These tasks run after all files in a directory are analyzed, allowing
     * the LLM to synthesize a richer directory overview from the .sum files.
     * Prompts are built at execution time by buildDirectoryPrompt().
     */
    createDirectoryTasks(files: PreparedFile[]): AnalysisTask[];
    /**
     * Create a complete generation plan.
     *
     * When `force` is false (default), files with existing `.sum` artifacts
     * and directories with existing generated `AGENTS.md` are skipped.
     * When `force` is true, all files and directories are processed.
     */
    createPlan(discoveryResult: DiscoveryResult, options?: {
        force?: boolean;
    }): Promise<GenerationPlan>;
    /**
     * Close resources (no-op in frontmatter mode, kept for API compatibility).
     */
    close(): void;
    /**
     * Check prerequisites for update.
     *
     * @throws Error if not in a git repository
     */
    checkPrerequisites(): Promise<void>;
    /**
     * Discover all source files in the project.
     */
    private discoverFiles;
    /**
     * Prepare update plan without executing analysis.
     *
     * Uses frontmatter-based change detection:
     * - Reads content_hash from each .sum file
     * - Compares with current file content hash
     * - Files with mismatched hashes need re-analysis
     *
     * @param options - Update options
     * @returns Update plan with files to analyze and cleanup actions
     */
    preparePlan(options?: UpdateOptions): Promise<UpdatePlan>;
    /**
     * Record file analyzed (no-op in frontmatter mode - hash is stored in .sum file).
     * Kept for API compatibility.
     */
    recordFileAnalyzed(_relativePath: string, _contentHash: string, _currentCommit: string): Promise<void>;
    /**
     * Remove file from state (no-op in frontmatter mode).
     * Kept for API compatibility.
     */
    removeFileState(_relativePath: string): Promise<void>;
    /**
     * Record a completed update run (no-op in frontmatter mode).
     * Kept for API compatibility.
     */
    recordRun(_commitHash: string, _filesAnalyzed: number, _filesSkipped: number): Promise<number>;
    /**
     * Get last run information (not available in frontmatter mode).
     * Kept for API compatibility.
     */
    getLastRun(): Promise<undefined>;
    /**
     * Check if this is the first run.
     * In frontmatter mode, checks if any .sum files exist.
     */
    isFirstRun(): Promise<boolean>;
    /**
     * Create analysis tasks for files.
     * Pre-builds prompts with optional existing .sum content for incremental updates.
     *
     * Used by both generate (PreparedFile[]) and update (FileChange[]) workflows.
     *
     * @param files - Files to create tasks for (PreparedFile[] or FileChange[])
     * @returns Array of analysis tasks with pre-built prompts
     */
    createFileTasks(files: PreparedFile[] | FileChange[]): Promise<AnalysisTask[]>;
}
/**
 * Create a documentation orchestrator.
 *
 * This is the unified orchestrator for both generation and update workflows.
 */
export declare function createOrchestrator(config: Config, projectRoot: string, options?: {
    tracer?: ITraceWriter;
    debug?: boolean;
    logger?: Logger;
}): DocumentationOrchestrator;
/**
 * Alias for createOrchestrator (for update command compatibility).
 */
export declare function createUpdateOrchestrator(config: Config, projectRoot: string, options?: {
    tracer?: ITraceWriter;
    debug?: boolean;
    logger?: Logger;
}): DocumentationOrchestrator;
//# sourceMappingURL=orchestrator.d.ts.map