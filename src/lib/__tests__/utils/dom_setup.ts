/**
 * Shared test utilities for setting up deno-dom environment
 *
 * This module provides polyfills and setup functions to make deno-dom
 * compatible with just-jsx components in tests.
 */

import { DocumentFragment, DOMParser, Node } from "@b-fuze/deno-dom/wasm";

/**
 * Polyfill for deno-dom's missing createElementNS for SVG
 *
 * deno-dom doesn't implement createElementNS for SVG namespace.
 * This polyfill creates regular elements with appropriate namespaceURI.
 */
function polyfillCreateElementNS() {
  const doc = globalThis.document as unknown as Document;
  const originalCreateElement = doc.createElement.bind(doc);

  (doc as unknown as Record<string, unknown>).createElementNS = function (
    namespaceURI: string,
    qualifiedName: string,
  ) {
    const element = originalCreateElement(qualifiedName);

    // Manually set the namespaceURI since deno-dom doesn't support it
    Object.defineProperty(element, "namespaceURI", {
      value: namespaceURI,
      writable: false,
      enumerable: true,
      configurable: true,
    });

    return element;
  };
}

/**
 * Polyfill for deno-dom's missing .style property implementation
 *
 * deno-dom elements don't have a proper CSSStyleDeclaration object.
 * This polyfill creates a Proxy that syncs style property access
 * with the element's style attribute.
 */
function polyfillStyleProperty() {
  const doc = globalThis.document as unknown as Document;
  const originalCreateElement = doc.createElement.bind(doc);

  (doc as unknown as Record<string, unknown>).createElement = function (
    tagName: string,
  ) {
    const element = originalCreateElement(tagName);

    // deno-dom elements don't have a proper style object, we need to add one
    if (!element.style || typeof element.style !== "object") {
      Object.defineProperty(element, "style", {
        value: new Proxy({}, {
          set(_target, prop, value) {
            const currentStyle = element.getAttribute("style") || "";
            const styles = currentStyle.split(";").filter((s: string) =>
              s.trim()
            );
            const newStylePair = `${String(prop)}: ${value}`;

            // Remove existing property if present
            const filteredStyles = styles.filter((s: string) =>
              !s.trim().startsWith(`${String(prop)}:`)
            );
            filteredStyles.push(newStylePair);

            element.setAttribute("style", filteredStyles.join("; "));
            return true;
          },
          get(_target, prop) {
            const currentStyle = element.getAttribute("style") || "";
            const styles = currentStyle.split(";");
            for (const style of styles) {
              const [key, value] = style.split(":").map((s: string) =>
                s.trim()
              );
              if (key === prop) {
                return value;
              }
            }
            return "";
          },
        }),
        configurable: true,
        enumerable: true,
      });
    }

    return element;
  };
}

/**
 * Sets up global DOM environment for deno-dom
 *
 * Call this function in beforeEach() to initialize a fresh DOM environment
 * for each test. This function:
 * - Creates a new HTML document
 * - Sets up global document and window objects
 * - Adds Node and DocumentFragment to global scope
 * - Applies the style property polyfill
 *
 * @example
 * ```typescript
 * import { setupDOM } from "@/lib/testing/dom_setup.ts";
 *
 * describe("My Component", () => {
 *   beforeEach(() => {
 *     setupDOM();
 *     document.body.innerHTML = ""; // Clear for each test
 *   });
 *
 *   it("should render", () => {
 *     const element = <div>Hello</div>;
 *     document.body.appendChild(element);
 *     // ...assertions
 *   });
 * });
 * ```
 */
export function setupDOM(): void {
  const doc = new DOMParser().parseFromString(
    `<!DOCTYPE html><html><head></head><body></body></html>`,
    "text/html",
  );

  if (!doc) {
    throw new Error("Failed to parse HTML document");
  }

  // @ts-ignore - Setting up global DOM for testing
  globalThis.document = doc;
  // @ts-ignore - Setting up global window for testing
  globalThis.window = doc.defaultView;
  // @ts-ignore - Add Node constructor to global scope
  globalThis.Node = Node;
  // @ts-ignore - Add DocumentFragment constructor to global scope
  globalThis.DocumentFragment = DocumentFragment;

  // Add HTML element constructors for instanceof checks (needed by hotkey manager)
  // @ts-ignore - Add HTMLInputElement for instanceof checks
  // deno-lint-ignore no-explicit-any
  globalThis.HTMLInputElement = (doc.createElement("input") as any).constructor;
  // @ts-ignore - Add HTMLTextAreaElement for instanceof checks
  // deno-lint-ignore no-explicit-any
  globalThis.HTMLTextAreaElement =
    (doc.createElement("textarea") as any).constructor;
  // @ts-ignore - Add HTMLElement for instanceof checks
  // deno-lint-ignore no-explicit-any
  globalThis.HTMLElement = (doc.createElement("div") as any).constructor;

  // Apply polyfills
  polyfillCreateElementNS();
  polyfillStyleProperty();
}

/**
 * Cleans up the DOM environment
 *
 * Call this in afterEach() if you need to explicitly clean up
 * global DOM objects. Usually not necessary since beforeEach()
 * will overwrite them.
 */
export function cleanupDOM(): void {
  // @ts-ignore - Cleaning up global DOM
  globalThis.document = undefined;
  // @ts-ignore - Cleaning up global window
  globalThis.window = undefined;
  // @ts-ignore - Cleaning up global Node
  globalThis.Node = undefined;
  // @ts-ignore - Cleaning up global DocumentFragment
  globalThis.DocumentFragment = undefined;
}
