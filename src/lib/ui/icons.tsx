import { createDomElement, Ref } from "@pkg/just-jsx/src/index.ts";

export function CopyIconSvg() {
  return (
    <svg
      class="inline"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 4.7158V2.40625C5 1.6296 5.6296 1 6.40625 1H18.5938C19.3704 1 20 1.6296 20 2.40625V14.5938C20 15.3704 19.3704 16 18.5938 16H16.2582"
        class="stroke-app-green-200"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5938 5H2.40625C1.6296 5 1 5.6296 1 6.40625V18.5938C1 19.3704 1.6296 20 2.40625 20H14.5938C15.3704 20 16 19.3704 16 18.5938V6.40625C16 5.6296 15.3704 5 14.5938 5Z"
        class="stroke-app-green-200"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  ) as SVGElement;
}

export function PlusIcon({ ref }: { ref: Ref }) {
  return (
    <svg
      ref={ref}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7H14"
        class="stroke-app-green-500"
        strokeWidth="3"
      />
      <path
        d="M7 0L7 14"
        class="stroke-app-green-500"
        strokeWidth="3"
      />
    </svg>
  ) as SVGElement;
}

export function MinusIcon({ ref }: { ref: Ref }) {
  return (
    <svg
      ref={ref}
      class="hidden"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7H14"
        class="stroke-app-green-500"
        strokeWidth="3"
      />
    </svg>
  ) as SVGElement;
}

export function GrayPlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7H14"
        class="stroke-app-gray-100"
        strokeWidth="3"
      />
      <path
        d="M7 0L7 14"
        class="stroke-app-gray-100"
        strokeWidth="3"
      />
    </svg>
  ) as SVGElement;
}

export function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 8L40 40"
        class="stroke-app-green-500"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 40L40 8"
        class="stroke-app-green-500"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) as SVGElement;
}
