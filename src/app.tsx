import { createDomElement } from "@pkg/just-jsx";

export function App(): Node {
  return (
    <div class="rounded-lg border pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12">
      <p class="text-gray-600">Hello, world</p>
    </div>
  ) as Node;
}
