/**
 * Backend registry, factory, and auto-detection.
 *
 * Manages the set of registered AI CLI backends, selects the appropriate
 * backend at runtime via auto-detection or explicit request, and provides
 * actionable error messages when no CLI is found.
 *
 * @module
 */
import type { AIBackend } from './types.js';
/**
 * Registry of available AI CLI backends.
 *
 * Stores backends in insertion order, which determines the priority for
 * auto-detection. Use {@link createBackendRegistry} to get a pre-populated
 * registry with all supported backends.
 *
 * @example
 * ```typescript
 * const registry = createBackendRegistry();
 * const claude = registry.get('claude');
 * const all = registry.getAll(); // [ClaudeBackend, GeminiBackend, OpenCodeBackend]
 * ```
 */
export declare class BackendRegistry {
    private readonly backends;
    /**
     * Register a backend adapter.
     *
     * @param backend - The backend to register (keyed by its `name` property)
     */
    register(backend: AIBackend): void;
    /**
     * Get a specific backend by name.
     *
     * @param name - The backend name (e.g., "claude", "gemini", "opencode")
     * @returns The backend, or `undefined` if not registered
     */
    get(name: string): AIBackend | undefined;
    /**
     * Get all registered backends in priority order.
     *
     * @returns Array of all registered backends
     */
    getAll(): AIBackend[];
}
/**
 * Create a new backend registry pre-populated with all supported backends.
 *
 * Registration order determines auto-detection priority:
 * 1. Claude (recommended, fully implemented)
 * 2. Gemini (experimental, stub)
 * 3. OpenCode (experimental, stub)
 *
 * @returns A populated {@link BackendRegistry}
 *
 * @example
 * ```typescript
 * const registry = createBackendRegistry();
 * const backend = await detectBackend(registry);
 * ```
 */
export declare function createBackendRegistry(): BackendRegistry;
/**
 * Detect the first available backend on PATH in priority order.
 *
 * Iterates all registered backends and calls `isAvailable()` on each.
 * Returns the first backend whose CLI is found, or `null` if none are
 * available.
 *
 * Priority order is determined by registration order in
 * {@link createBackendRegistry}: Claude > Gemini > OpenCode.
 *
 * @param registry - The backend registry to search
 * @returns The first available backend, or `null` if none found
 *
 * @example
 * ```typescript
 * const registry = createBackendRegistry();
 * const backend = await detectBackend(registry);
 * if (backend) {
 *   console.log(`Using ${backend.name} backend`);
 * }
 * ```
 */
export declare function detectBackend(registry: BackendRegistry): Promise<AIBackend | null>;
/**
 * Get formatted install instructions for all registered backends.
 *
 * Returns a multi-line string suitable for error messages when no CLI
 * is found. Matches the error message template from RESEARCH.md.
 *
 * @param registry - The backend registry
 * @returns Formatted install instructions string
 *
 * @example
 * ```typescript
 * const instructions = getInstallInstructions(registry);
 * console.error(`No AI CLI found.\n\nInstall one of the following:\n\n${instructions}`);
 * ```
 */
export declare function getInstallInstructions(registry: BackendRegistry): string;
/**
 * Resolve a backend by name or auto-detect the best available one.
 *
 * - If `requested` is `'auto'`: runs {@link detectBackend} and throws with
 *   install instructions if nothing is found.
 * - If `requested` is a specific name: looks it up in the registry, checks
 *   availability, and throws if not found or not available.
 *
 * @param registry - The backend registry
 * @param requested - Backend name or `'auto'` for auto-detection
 * @returns The resolved backend adapter
 * @throws {AIServiceError} With code `CLI_NOT_FOUND` if no backend is available
 *
 * @example
 * ```typescript
 * const registry = createBackendRegistry();
 *
 * // Auto-detect
 * const backend = await resolveBackend(registry, 'auto');
 *
 * // Explicit selection
 * const claude = await resolveBackend(registry, 'claude');
 * ```
 */
export declare function resolveBackend(registry: BackendRegistry, requested: string | 'auto'): Promise<AIBackend>;
//# sourceMappingURL=registry.d.ts.map