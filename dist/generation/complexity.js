import * as path from 'node:path';
/**
 * Calculate maximum directory depth from file paths.
 */
function calculateDirectoryDepth(files, projectRoot) {
    let maxDepth = 0;
    for (const file of files) {
        const relativePath = path.relative(projectRoot, file);
        const depth = relativePath.split(path.sep).length - 1; // -1 for the file itself
        maxDepth = Math.max(maxDepth, depth);
    }
    return maxDepth;
}
/**
 * Extract unique directories from file paths.
 */
function extractDirectories(files) {
    const directories = new Set();
    for (const file of files) {
        let dir = path.dirname(file);
        while (dir && dir !== '.') {
            directories.add(dir);
            const parent = path.dirname(dir);
            if (parent === dir)
                break; // Reached root
            dir = parent;
        }
    }
    return directories;
}
/**
 * Analyze codebase complexity from discovered files.
 *
 * @param files - List of source file paths
 * @param projectRoot - Project root directory
 * @returns Complexity metrics
 */
export function analyzeComplexity(files, projectRoot) {
    return {
        fileCount: files.length,
        directoryDepth: calculateDirectoryDepth(files, projectRoot),
        files,
        directories: extractDirectories(files),
    };
}
//# sourceMappingURL=complexity.js.map