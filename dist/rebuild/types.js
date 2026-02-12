/**
 * Types for the rebuild module.
 *
 * Provides Zod-validated checkpoint schema and interfaces for rebuild
 * units, plans, and results.
 *
 * @module
 */
import { z } from 'zod';
/**
 * Zod schema for the rebuild checkpoint file.
 *
 * Validated when reading from disk to detect corruption or version mismatch.
 */
export const RebuildCheckpointSchema = z.object({
    version: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    outputDir: z.string(),
    specHashes: z.record(z.string(), z.string()),
    modules: z.record(z.string(), z.object({
        status: z.enum(['pending', 'done', 'failed']),
        completedAt: z.string().optional(),
        error: z.string().optional(),
        filesWritten: z.array(z.string()).optional(),
    })),
});
//# sourceMappingURL=types.js.map