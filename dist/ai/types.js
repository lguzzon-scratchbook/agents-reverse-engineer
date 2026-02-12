/**
 * Shared types for the AI service layer.
 *
 * Defines the contract for backends, responses, subprocess results,
 * retry configuration, and telemetry logging. Every AI service module
 * imports from this file.
 */
/**
 * Typed error for AI service failures.
 *
 * Carries a machine-readable {@link AIServiceErrorCode} so callers can
 * branch on the error type without parsing message strings.
 *
 * @example
 * ```typescript
 * try {
 *   await callAI(options);
 * } catch (error) {
 *   if (error instanceof AIServiceError && error.code === 'RATE_LIMIT') {
 *     // handle rate limiting
 *   }
 * }
 * ```
 */
export class AIServiceError extends Error {
    /** Machine-readable error code */
    code;
    constructor(code, message) {
        super(message);
        this.name = 'AIServiceError';
        this.code = code;
    }
}
//# sourceMappingURL=types.js.map