import { createDomElement } from "@pkg/just-jsx";

export default function Logo() {
  return (
    <div class="flex items-center justify-center">
      <svg
        width="67"
        height="46"
        viewBox="0 0 67 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.0972 23.1105L17.0444 7.15912L1 16.2646L10.0527 32.2161"
          fill="#4EBD85"
        />
        <path
          d="M26.0972 23.1105L17.0444 7.15912L1 16.2646L10.0527 32.2161"
          stroke="#003641"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M10.0527 32.216L43.4719 14.1078L41.9617 1L65.2671 23.2891L41.9617 44.8241L43.4719 31.4604L10.0527 32.216Z"
          fill="#CFF9B9"
          stroke="#003641"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      <h1
        class="ml-1 text-3xl font-bold text-app-black xs:text-4xl"
      >
        UnitSwitch
      </h1>
    </div>
  );
}
