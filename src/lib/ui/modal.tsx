import { CloseIcon } from "@/lib/ui/icons.tsx";
import { UserSubmissionCallback } from "@/lib/types.ts";
import { abbreviations, UNIT_ABBREVIATIONS } from "@/lib/units.ts";
import { createDomElement, createRef } from "@pkg/just-jsx/src/index.ts";
import { hotkeyManager } from "@/lib/hotkey_manager.ts";

const DISPLAY_BLOCK = "block";
const DISPLAY_NONE = "none";

type UnitAbbreviation = { abbr: string; name: string };

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
    hideSuggestions();
  }

  function hideSuggestions(): void {
    showSuggestions = false;
    selectedSuggestionIndex = -1;
    if (suggestionsDropdownRef.current) {
      suggestionsDropdownRef.current.style.display = DISPLAY_NONE;
    }
  }

  function updateSuggestions(query: string): void {
    if (!query) {
      hideSuggestions();
      return;
    }

    filteredSuggestions = UNIT_ABBREVIATIONS.filter(
      (unit) =>
        unit.abbr.startsWith(query.toLowerCase()) ||
        unit.name.toLowerCase().startsWith(query.toLowerCase()),
    );

    if (filteredSuggestions.length > 0) {
      showSuggestions = true;
      selectedSuggestionIndex = 0;
      renderSuggestions();
      if (suggestionsDropdownRef.current) {
        suggestionsDropdownRef.current.style.display = DISPLAY_BLOCK;
      }
    } else {
      hideSuggestions();
    }
  }

  function renderSuggestions(): void {
    if (!suggestionsDropdownRef.current) return;

    suggestionsDropdownRef.current.innerHTML = "";
    suggestionsDropdownRef.current.style.maxHeight = "200px";
    suggestionsDropdownRef.current.style.overflowY = "auto";

    filteredSuggestions.forEach((unit, index) => {
      const div = document.createElement("div");
      div.className = `px-3 py-2 cursor-pointer ${
        index === selectedSuggestionIndex
          ? "bg-app-green-600 text-white"
          : "text-app-gray-200 hover:bg-app-green-700"
      }`;
      div.textContent = `${unit.abbr} - ${unit.name}`;
      div.onclick = () => selectSuggestion(unit.abbr);
      suggestionsDropdownRef.current?.appendChild(div);
    });
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
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, 0);
      renderSuggestions();
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
  globalThis.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && modalRef.current && modalRef.current.style.display === DISPLAY_BLOCK) {
      e.preventDefault();
      onClickCloseModal();
    }
  });

  if (hotkey) {
    hotkeyManager.register(hotkey, function hotkeyHandlerModal() {
      if (inputRef.current && modalRef.current) {
        inputRef.current.value = "";
        modalRef.current.style.display = DISPLAY_BLOCK;
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    });
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
      class="fixed left-0 top-0 z-10 hidden h-screen w-full bg-app-black/70"
    >
      <div class="fixed inset-x-1/3 top-1/4 rounded-md border border-app-green-600 bg-app-black p-6 shadow-lg shadow-app-black">
        <form onsubmit={onSubmitModalForm}>
          <label class="font-bold text-white">
            Enter a Unit and a Value,{" "}
            <span class="text-app-green-400">
              <code>value:unit</code>
            </span>
          </label>
          <br />
          <div class="relative">
            <input
              ref={inputRef}
              class="rounded-sm bg-app-gray-100"
              type="text"
              name="name"
              data-testid="modal-input"
              oninput={onInputChange}
              onkeydown={onInputKeyDown}
            />
            <div
              ref={suggestionsDropdownRef}
              class="absolute left-0 top-full mt-1 w-full rounded-sm border border-app-green-600 bg-app-black shadow-lg"
              style={{ display: "none", "z-index": "100" }}
            />
          </div>
          <input
            class="ml-3 mt-3 cursor-pointer rounded-sm border-app-green-200 bg-app-green-300 px-3"
            type="submit"
            value="Submit"
          />
        </form>
        <div
          class="absolute right-3 top-3 cursor-pointer font-bold text-app-gray-200"
          onClick={onClickCloseModal}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}
