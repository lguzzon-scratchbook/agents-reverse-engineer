/**
 * Prompt templates for AI-driven project reconstruction.
 *
 * Provides the system prompt that instructs the AI to generate source files
 * using `===FILE:===` / `===END_FILE===` delimiters, and a per-unit user
 * prompt builder that combines the full spec, current phase, and already-built
 * context.
 *
 * @module
 */
import type { RebuildUnit } from './types.js';
/**
 * System prompt for AI-driven project reconstruction.
 *
 * Instructs the model to emit source files using `===FILE: path===` /
 * `===END_FILE===` delimiters with production-quality code that follows
 * the spec's architecture and type definitions.
 */
export declare const REBUILD_SYSTEM_PROMPT = "You reconstruct source code from a project specification.\n\nTASK:\nGenerate all source files for the described module/phase. The code must be complete, compilable, and production-ready.\n\nOUTPUT FORMAT:\nUse this exact delimiter format for EVERY file:\n\n===FILE: relative/path.ext===\n[file content]\n===END_FILE===\n\nGenerate ONLY the file content between delimiters. No markdown fencing, no commentary, no explanations outside the file delimiters.\n\nQUALITY:\n- Code must compile. Use exact type names, function signatures, and constants from the spec.\n- Follow the architecture and patterns described in the specification.\n- Imports must reference real modules described in the spec.\n- Generate production code only (no tests, no stubs, no placeholders).\n- Do not invent features not in the spec.\n- Do not add comments explaining what the spec says \u2014 write the code the spec describes.\n\nSTRICT COMPLIANCE:\n- When the specification defines exact names for functions, methods, types, classes, or constants, you MUST use those exact names. Do not invent synonyms (e.g., if the spec says done(), do not write reportSuccess()).\n- Pay close attention to the \"Interfaces for This Phase\" section in the current phase \u2014 it contains the exact signatures you must implement.\n- When \"Already Built\" context shows an exported symbol, import and use it. Do not redefine it.\n\nDELIMITER RULES:\n- ===FILE: and ===END_FILE=== MUST appear on their own line with NO leading whitespace.\n- If your generated code contains the literal text \"===FILE:\" (e.g., in a parser or template), ensure it is indented or inside a string \u2014 never at column 0.\n\nCONTEXT AWARENESS:\nWhen \"Already Built\" context is provided, import from those modules and use their exported types/functions. Do not redefine types that already exist in built modules.\nWhen \"Already Built\" context provides a function or method signature, your code MUST call it using the exact name shown. Match the API precisely.";
/**
 * Build the system + user prompt pair for a single rebuild unit.
 *
 * The user prompt includes:
 * 1. Full specification for reference
 * 2. Current phase/module to build
 * 3. Already-built context (exported signatures from prior groups)
 * 4. Output format reminder
 *
 * @param unit - The rebuild unit to generate code for
 * @param fullSpec - Concatenated content of all spec files
 * @param builtContext - Exported type signatures from previously built modules
 * @returns Prompt pair with system and user strings
 */
export declare function buildRebuildPrompt(unit: RebuildUnit, fullSpec: string, builtContext: string | undefined): {
    system: string;
    user: string;
};
//# sourceMappingURL=prompts.d.ts.map