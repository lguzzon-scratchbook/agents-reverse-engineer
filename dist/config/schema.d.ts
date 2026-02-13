/**
 * Zod schema for configuration validation
 *
 * This schema defines the structure of `.agents-reverse/config.yaml`
 * and provides sensible defaults for all fields.
 */
import { z } from 'zod';
/**
 * Schema for exclusion configuration
 */
declare const ExcludeSchema: z.ZodObject<{
    patterns: z.ZodDefault<z.ZodArray<z.ZodString>>;
    vendorDirs: z.ZodDefault<z.ZodArray<z.ZodString>>;
    binaryExtensions: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * Schema for options configuration
 */
declare const OptionsSchema: z.ZodObject<{
    followSymlinks: z.ZodDefault<z.ZodBoolean>;
    maxFileSize: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Schema for output configuration
 */
declare const OutputSchema: z.ZodObject<{
    colors: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Schema for generation configuration.
 *
 * Controls documentation generation behavior including compression ratio
 * for .sum files. All fields have sensible defaults.
 */
declare const GenerationSchema: z.ZodObject<{
    compressionRatio: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Schema for AI service configuration.
 *
 * Controls backend selection, model, timeout, retry behavior, and
 * telemetry log retention. All fields have sensible defaults.
 */
declare const AISchema: z.ZodObject<{
    backend: z.ZodDefault<z.ZodEnum<{
        claude: "claude";
        codex: "codex";
        gemini: "gemini";
        opencode: "opencode";
        auto: "auto";
    }>>;
    model: z.ZodDefault<z.ZodString>;
    timeoutMs: z.ZodDefault<z.ZodNumber>;
    maxRetries: z.ZodDefault<z.ZodNumber>;
    concurrency: z.ZodDefault<z.ZodNumber>;
    telemetry: z.ZodObject<{
        keepRuns: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Main configuration schema for agents-reverse.
 *
 * All fields have sensible defaults, so an empty object `{}` is valid
 * and will result in a fully populated configuration.
 *
 * @example
 * ```typescript
 * // Parse with defaults
 * const config = ConfigSchema.parse({});
 *
 * // Parse with partial overrides
 * const config = ConfigSchema.parse({
 *   exclude: { patterns: ['*.log'] },
 *   ai: { backend: 'claude', model: 'opus' },
 * });
 * ```
 */
export declare const ConfigSchema: z.ZodObject<{
    exclude: z.ZodObject<{
        patterns: z.ZodDefault<z.ZodArray<z.ZodString>>;
        vendorDirs: z.ZodDefault<z.ZodArray<z.ZodString>>;
        binaryExtensions: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>;
    options: z.ZodObject<{
        followSymlinks: z.ZodDefault<z.ZodBoolean>;
        maxFileSize: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>;
    output: z.ZodObject<{
        colors: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
    generation: z.ZodObject<{
        compressionRatio: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>;
    ai: z.ZodObject<{
        backend: z.ZodDefault<z.ZodEnum<{
            claude: "claude";
            codex: "codex";
            gemini: "gemini";
            opencode: "opencode";
            auto: "auto";
        }>>;
        model: z.ZodDefault<z.ZodString>;
        timeoutMs: z.ZodDefault<z.ZodNumber>;
        maxRetries: z.ZodDefault<z.ZodNumber>;
        concurrency: z.ZodDefault<z.ZodNumber>;
        telemetry: z.ZodObject<{
            keepRuns: z.ZodDefault<z.ZodNumber>;
        }, z.core.$strip>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Inferred TypeScript type from the schema.
 * Use this type for function parameters and return types.
 */
export type Config = z.infer<typeof ConfigSchema>;
/**
 * Type for the exclude section of config
 */
export type ExcludeConfig = z.infer<typeof ExcludeSchema>;
/**
 * Type for the options section of config
 */
export type OptionsConfig = z.infer<typeof OptionsSchema>;
/**
 * Type for the output section of config
 */
export type OutputConfig = z.infer<typeof OutputSchema>;
/**
 * Type for the generation section of config
 */
export type GenerationConfig = z.infer<typeof GenerationSchema>;
/**
 * Type for the AI service section of config
 */
export type AIConfig = z.infer<typeof AISchema>;
export {};
//# sourceMappingURL=schema.d.ts.map