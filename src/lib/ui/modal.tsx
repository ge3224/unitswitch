import { CloseIcon } from "@/lib/ui/icons.tsx";
import { UserSubmissionCallback } from "@/lib/types.ts";
import { abbreviations, UNIT_ABBREVIATIONS } from "@/lib/units.ts";
import { createDomElement, createRef } from "@pkg/just-jsx/src/index.ts";
import { registerHotkeyHandler } from "@/lib/hotkey_manager.ts";

const DISPLAY_BLOCK = "block";
const DISPLAY_NONE = "none";

type UnitAbbreviation = { abbr: string; name: string };

// Keyboard shortcut icons
function ArrowUpIcon() {
  return (
    <svg
      width="15"
      height="15"
      aria-label="Arrow up"
      role="img"
      viewBox="0 0 15 15"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.2"
      >
        <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
      </g>
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      width="15"
      height="15"
      aria-label="Arrow down"
      role="img"
      viewBox="0 0 15 15"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.2"
      >
        <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
      </g>
    </svg>
  );
}

function EnterIcon() {
  return (
    <svg
      width="15"
      height="15"
      aria-label="Enter key"
      role="img"
      viewBox="0 0 15 15"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.2"
      >
        <path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path>
      </g>
    </svg>
  );
}

function EscapeIcon() {
  return (
    <svg
      width="15"
      height="15"
      aria-label="Escape key"
      role="img"
      viewBox="0 0 15 15"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.2"
      >
        <path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956">
        </path>
      </g>
    </svg>
  );
}

export default function Modal({
  callback,
  hotkey,
}: {
  callback: UserSubmissionCallback;
  hotkey: string;
}) {
  const modalRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();
  const suggestionsDropdownRef = createRef<HTMLDivElement>();

  let filteredSuggestions: UnitAbbreviation[] = [];
  let selectedSuggestionIndex = -1;
  let showSuggestions = false;

  function onClickCloseModal(): void {
    if (modalRef.current) {
      modalRef.current.style.display = DISPLAY_NONE;
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    hideSuggestions();
  }

  function onClickClearInput(): void {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    hideSuggestions();
  }

  function hideSuggestions(): void {
    showSuggestions = false;
    selectedSuggestionIndex = -1;
    if (suggestionsDropdownRef.current) {
      suggestionsDropdownRef.current.style.display = DISPLAY_NONE;
    }
    if (inputRef.current) {
      inputRef.current.setAttribute("aria-expanded", "false");
    }
  }

  function updateSuggestions(query: string): void {
    if (!query) {
      hideSuggestions();
      return;
    }

    const filterUnit: (unit: UnitAbbreviation) => boolean = function filterUnit(
      unit: UnitAbbreviation,
    ): boolean {
      return unit.abbr.startsWith(query.toLowerCase()) ||
        unit.name.toLowerCase().startsWith(query.toLowerCase());
    };
    filteredSuggestions = UNIT_ABBREVIATIONS.filter(filterUnit);

    if (filteredSuggestions.length > 0) {
      showSuggestions = true;
      selectedSuggestionIndex = 0;
      renderSuggestions();
      if (suggestionsDropdownRef.current) {
        suggestionsDropdownRef.current.style.display = DISPLAY_BLOCK;
      }
      if (inputRef.current) {
        inputRef.current.setAttribute("aria-expanded", "true");
        inputRef.current.setAttribute("aria-activedescendant", `suggestion-${selectedSuggestionIndex}`);
      }
    } else {
      hideSuggestions();
    }
  }

  function renderSuggestions(): void {
    if (!suggestionsDropdownRef.current) return;

    suggestionsDropdownRef.current.innerHTML = "";
    suggestionsDropdownRef.current.style.maxHeight = "240px";
    suggestionsDropdownRef.current.style.overflowY = "auto";

    const renderSuggestion: (unit: UnitAbbreviation, index: number) => void =
      function renderSuggestion(unit: UnitAbbreviation, index: number): void {
        const div = document.createElement("div");
        div.setAttribute("role", "option");
        div.setAttribute("aria-selected", (index === selectedSuggestionIndex).toString());
        div.id = `suggestion-${index}`;
        div.className =
          `px-4 py-2.5 cursor-pointer flex items-center justify-between transition-colors ${
            index === selectedSuggestionIndex
              ? "bg-app-green-600 dark:bg-app-green-700 text-white"
              : "text-app-gray-200 dark:text-app-gray-300 hover:bg-app-green-700/50 dark:hover:bg-app-green-800/50"
          }`;

        // Create content wrapper
        const contentWrapper = document.createElement("div");
        contentWrapper.className = "flex items-center gap-3";

        // Create abbreviation span
        const abbrSpan = document.createElement("span");
        abbrSpan.className = `font-mono font-semibold ${
          index === selectedSuggestionIndex
            ? "text-white"
            : "text-app-green-400 dark:text-app-green-300"
        }`;
        abbrSpan.textContent = unit.abbr;

        // Create name span
        const nameSpan = document.createElement("span");
        nameSpan.className = "text-sm";
        nameSpan.textContent = unit.name;

        contentWrapper.appendChild(abbrSpan);
        contentWrapper.appendChild(nameSpan);
        div.appendChild(contentWrapper);

        div.onclick = function handleSuggestionClick(): void {
          selectSuggestion(unit.abbr);
        };
        suggestionsDropdownRef.current?.appendChild(div);
      };
    filteredSuggestions.forEach(renderSuggestion);
  }

  function selectSuggestion(abbr: string): void {
    if (!inputRef.current) return;

    const currentValue = inputRef.current.value;
    const colonIndex = currentValue.indexOf(":");

    if (colonIndex !== -1) {
      inputRef.current.value = currentValue.substring(0, colonIndex + 1) + abbr;
    }

    hideSuggestions();
    inputRef.current.focus();
  }

  function onInputChange(): void {
    if (!inputRef.current) return;

    const value = inputRef.current.value;
    const colonIndex = value.indexOf(":");

    if (colonIndex !== -1 && colonIndex < value.length - 1) {
      const unitQuery = value.substring(colonIndex + 1);
      updateSuggestions(unitQuery);
    } else {
      hideSuggestions();
    }
  }

  function onInputKeyDown(e: KeyboardEvent): void {
    if (e.key === "Escape") {
      e.preventDefault();
      onClickCloseModal();
      return;
    }

    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedSuggestionIndex = Math.min(
        selectedSuggestionIndex + 1,
        filteredSuggestions.length - 1,
      );
      renderSuggestions();
      if (inputRef.current) {
        inputRef.current.setAttribute("aria-activedescendant", `suggestion-${selectedSuggestionIndex}`);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, 0);
      renderSuggestions();
      if (inputRef.current) {
        inputRef.current.setAttribute("aria-activedescendant", `suggestion-${selectedSuggestionIndex}`);
      }
    } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      e.preventDefault();
      const selected = filteredSuggestions[selectedSuggestionIndex];
      if (selected) {
        selectSuggestion(selected.abbr);
      }
    } else if (e.key === "Tab" && selectedSuggestionIndex >= 0) {
      e.preventDefault();
      const selected = filteredSuggestions[selectedSuggestionIndex];
      if (selected) {
        selectSuggestion(selected.abbr);
      }
    }
  }

  // Global Escape listener to close modal
  const handleGlobalEscape: (e: KeyboardEvent) => void =
    function handleGlobalEscape(e: KeyboardEvent): void {
      if (
        e.key === "Escape" && modalRef.current &&
        modalRef.current.style.display === DISPLAY_BLOCK
      ) {
        e.preventDefault();
        onClickCloseModal();
      }
    };
  globalThis.addEventListener("keydown", handleGlobalEscape);

  if (hotkey) {
    registerHotkeyHandler(hotkey, function hotkeyHandlerModal() {
      if (inputRef.current && modalRef.current) {
        inputRef.current.value = "";
        modalRef.current.style.display = DISPLAY_BLOCK;
        const focusInput: () => void = function focusInput(): void {
          inputRef.current?.focus();
        };
        requestAnimationFrame(focusInput);
      }
    }, "ctrl");
  }

  function onSubmitModalForm(e: Event): void {
    e.preventDefault();
    const inputValue = inputRef.current?.value;

    if (inputValue === undefined) {
      return;
    }

    const split = inputValue.split(":");
    const num = parseFloat(split[0]);

    if (Number.isNaN(num)) {
      onClickCloseModal();
      return;
    }

    const unitInput = split[1]?.toLowerCase();

    if (!unitInput) {
      onClickCloseModal();
      return;
    }

    const unit = abbreviations(unitInput);

    if (!unit) {
      onClickCloseModal();
      return;
    }

    callback(num, unit);
    onClickCloseModal();
  }

  return (
    <div
      ref={modalRef}
      class="fixed left-0 top-0 z-10 hidden h-screen w-full bg-app-black/70 dark:bg-black/80"
      role="presentation"
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        class="fixed inset-x-4 top-1/4 sm:inset-x-1/4 lg:inset-x-1/3 flex flex-col rounded-md border border-app-green-600 dark:border-app-green-700 bg-app-black dark:bg-app-green-900 shadow-lg shadow-app-black dark:shadow-black @container"
      >
        {/* Header */}
        <div class="border-b border-app-green-600 dark:border-app-green-700 px-6 py-4">
          <div class="flex items-start justify-between">
            <div>
              <label id="modal-title" class="text-lg font-bold text-white">
                Enter a value and unit
              </label>
              <div class="mt-1 text-sm text-app-gray-200">
                Format:{" "}
                <span class="text-app-green-400">
                  <code>value:unit</code>
                </span>
              </div>
            </div>
            <button
              type="button"
              class="cursor-pointer rounded p-1 text-app-gray-200 transition-colors hover:bg-app-green-700 hover:text-white"
              onClick={function handleCloseClick(): void {
                onClickCloseModal();
              }}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <form
          onsubmit={function handleFormSubmit(e: Event): void {
            onSubmitModalForm(e);
          }}
          class="flex flex-col"
        >
          <div class="px-6 py-4">
            <div class="relative">
              <input
                id="modal-input"
                ref={inputRef}
                class="w-full rounded-sm border border-transparent dark:border-app-green-700 bg-app-gray-100 dark:bg-app-gray-800 dark:text-white px-3 py-2 text-base outline-none focus:ring-2 focus:ring-app-green-600"
                type="text"
                name="name"
                placeholder="e.g., 100:px or 2:rem"
                data-testid="modal-input"
                aria-labelledby="modal-title"
                aria-autocomplete="list"
                aria-controls="suggestions-dropdown"
                aria-expanded="false"
                role="combobox"
                oninput={function handleInputChange(): void {
                  onInputChange();
                }}
                onkeydown={function handleInputKeyDown(e: KeyboardEvent): void {
                  onInputKeyDown(e);
                }}
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1 text-app-gray-200 dark:text-app-gray-300 transition-colors hover:bg-app-gray-200 dark:hover:bg-app-gray-700 hover:text-app-black dark:hover:text-white"
                onClick={function handleClearClick(): void {
                  onClickClearInput();
                }}
                aria-label="Clear input"
                title="Clear"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                id="suggestions-dropdown"
                ref={suggestionsDropdownRef}
                role="listbox"
                class="absolute left-0 top-full mt-1 w-full rounded-sm border border-app-green-600 dark:border-app-green-700 bg-app-black dark:bg-app-green-900 shadow-lg"
                style={{ display: "none", "z-index": "100" }}
              />
            </div>
          </div>

          {/* Footer */}
          <div class="flex flex-col items-start border-t border-app-green-600 dark:border-app-green-700 px-8 py-6 gap-3">
            <div class="flex flex-wrap items-center gap-4 text-xs text-app-gray-200">
              <div class="flex items-center gap-1">
                <kbd class="flex items-center justify-center rounded border border-app-green-600/50 bg-app-gray-100/10 px-1.5 py-0.5">
                  <EnterIcon />
                </kbd>
                <span>to submit</span>
              </div>
              <div class="flex items-center gap-1">
                <kbd class="flex items-center justify-center rounded border border-app-green-600/50 bg-app-gray-100/10 px-1.5 py-0.5">
                  <ArrowUpIcon />
                </kbd>
                <kbd class="flex items-center justify-center rounded border border-app-green-600/50 bg-app-gray-100/10 px-1.5 py-0.5">
                  <ArrowDownIcon />
                </kbd>
                <span>to navigate</span>
              </div>
              <div class="flex items-center gap-1">
                <kbd class="flex items-center justify-center rounded border border-app-green-600/50 bg-app-gray-100/10 px-1.5 py-0.5">
                  <EscapeIcon />
                </kbd>
                <span>to close</span>
              </div>
            </div>
            <div class="flex items-center mt-2 gap-2">
              <button
                type="button"
                class="cursor-pointer rounded-sm border border-app-green-600/50 bg-transparent px-3 py-1 text-sm text-app-gray-200 transition-colors hover:bg-app-green-700 hover:text-white"
                onClick={function handleCancelClick(): void {
                  onClickCloseModal();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                class="cursor-pointer rounded-sm border border-app-green-200 dark:border-app-green-400 bg-app-green-300 dark:bg-app-green-600 px-3 py-1 text-sm font-medium text-app-black dark:text-white transition-colors hover:bg-app-green-400"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
