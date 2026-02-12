/**
 * Metrics about codebase complexity.
 */
export interface ComplexityMetrics {
    /** Total number of source files */
    fileCount: number;
    /** Maximum directory depth */
    directoryDepth: number;
    /** List of source file paths */
    files: string[];
    /** Unique directory paths */
    directories: Set<string>;
}
/**
 * Analyze codebase complexity from discovered files.
 *
 * @param files - List of source file paths
 * @param projectRoot - Project root directory
 * @returns Complexity metrics
 */
export declare function analyzeComplexity(files: string[], projectRoot: string): ComplexityMetrics;
//# sourceMappingURL=complexity.d.ts.map