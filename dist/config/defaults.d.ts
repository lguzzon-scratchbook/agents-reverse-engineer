/**
 * Default configuration values for agents-reverse
 */
/**
 * Compute the default concurrency based on available CPU cores and system memory.
 *
 * Formula: clamp(cores * 5, MIN, min(memCap, MAX))
 * - cores: os.availableParallelism() or os.cpus().length
 * - memCap: floor(totalMemGB * 0.5 / 0.512) — use at most 50% of RAM for subprocesses
 *
 * @returns Default concurrency value (integer between MIN_CONCURRENCY and MAX_CONCURRENCY)
 */
export declare function getDefaultConcurrency(): number;
/**
 * Default vendor directories to exclude from analysis.
 * These are typically package managers, build outputs, or version control directories.
 */
export declare const DEFAULT_VENDOR_DIRS: readonly ["node_modules", "vendor", ".git", "dist", "build", "__pycache__", ".next", "venv", ".venv", "target", ".cargo", ".gradle", ".agents-reverse-engineer", ".agents", ".planning", ".claude", ".opencode", ".gemini"];
/**
 * Default file patterns to exclude from analysis.
 * These patterns use gitignore syntax and are matched by the custom filter.
 */
export declare const DEFAULT_EXCLUDE_PATTERNS: readonly ["AGENTS.md", "CLAUDE.md", "OPENCODE.md", "GEMINI.md", "**/AGENTS.md", "**/CLAUDE.md", "**/OPENCODE.md", "**/GEMINI.md", "*.local.md", "**/*.local.md", "*.lock", "package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lock", "bun.lockb", "Gemfile.lock", "Cargo.lock", "poetry.lock", "composer.lock", "go.sum", ".gitignore", ".gitattributes", ".gitkeep", ".env", "**/.env", "**/.env.*", "*.log", "*.sum", "**/*.sum", "**/SKILL.md"];
/**
 * Default binary file extensions to exclude from analysis.
 * These files cannot be meaningfully analyzed as text.
 */
export declare const DEFAULT_BINARY_EXTENSIONS: readonly [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".ico", ".webp", ".zip", ".tar", ".gz", ".rar", ".7z", ".exe", ".dll", ".so", ".dylib", ".mp3", ".mp4", ".wav", ".pdf", ".woff", ".woff2", ".ttf", ".eot", ".class", ".pyc"];
/**
 * Default maximum file size in bytes (1MB).
 * Files larger than this will be skipped with a warning.
 */
export declare const DEFAULT_MAX_FILE_SIZE: number;
/**
 * Default compression ratio for .sum files (0.25 = 25% of source size).
 * This produces balanced summaries that preserve important details while
 * reducing token usage. Lower values enable aggressive compression.
 */
export declare const DEFAULT_COMPRESSION_RATIO = 0.25;
/**
 * Default configuration object matching the schema structure.
 * This is used when no config file is present or for missing fields.
 */
export declare const DEFAULT_CONFIG: {
    readonly exclude: {
        readonly patterns: readonly ["AGENTS.md", "CLAUDE.md", "OPENCODE.md", "GEMINI.md", "**/AGENTS.md", "**/CLAUDE.md", "**/OPENCODE.md", "**/GEMINI.md", "*.local.md", "**/*.local.md", "*.lock", "package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lock", "bun.lockb", "Gemfile.lock", "Cargo.lock", "poetry.lock", "composer.lock", "go.sum", ".gitignore", ".gitattributes", ".gitkeep", ".env", "**/.env", "**/.env.*", "*.log", "*.sum", "**/*.sum", "**/SKILL.md"];
        readonly vendorDirs: readonly ["node_modules", "vendor", ".git", "dist", "build", "__pycache__", ".next", "venv", ".venv", "target", ".cargo", ".gradle", ".agents-reverse-engineer", ".agents", ".planning", ".claude", ".opencode", ".gemini"];
        readonly binaryExtensions: readonly [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".ico", ".webp", ".zip", ".tar", ".gz", ".rar", ".7z", ".exe", ".dll", ".so", ".dylib", ".mp3", ".mp4", ".wav", ".pdf", ".woff", ".woff2", ".ttf", ".eot", ".class", ".pyc"];
    };
    readonly options: {
        readonly followSymlinks: false;
        readonly maxFileSize: number;
    };
    readonly output: {
        readonly colors: true;
    };
    readonly generation: {
        readonly compressionRatio: 0.25;
    };
};
//# sourceMappingURL=defaults.d.ts.map