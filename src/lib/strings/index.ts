/**
 * Centralized string constants for user-facing text.
 *
 * This module provides a single source of truth for all user-visible strings,
 * making it easier to:
 * - Maintain consistent messaging across the application
 * - Update text without searching through component code
 * - Add internationalization support in the future
 *
 * Usage:
 * ```ts
 * import { UI, VALIDATION, A11Y, NOTIFICATIONS } from "@/lib/strings/index.ts";
 *
 * <button>{UI.buttons.save}</button>
 * toast.success(NOTIFICATIONS.success.copied);
 * ```
 */

export { UI } from "./ui.ts";
export { VALIDATION } from "./validation.ts";
export { A11Y } from "./accessibility.ts";
export { NOTIFICATIONS } from "./notifications.ts";
