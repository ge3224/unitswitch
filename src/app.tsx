import { createDomElement } from "@pkg/just-jsx";
import UserInput from "@lib/ui/user_input";
import { Unit, Units } from "@lib/units";
import Logo from "@lib/ui/logo";

export function App(): Node {
  function _handleSubmit(value: number, unit: Unit): void {
    console.log(value, unit);
  }


  return (
    <div class="rounded-lg border border-app-green-600 bg-app-green-50 pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12">
      <div class="relative flex flex-col border-b border-app-green-600 px-11 pt-12 lg:col-span-2 lg:row-span-2 lg:flex-row lg:justify-center lg:border lg:py-8">
        <Logo />
        <UserInput input={16} type={Units.Pixels} callback={_handleSubmit} />
      </div>
    </div>
  ) as Node;
}
