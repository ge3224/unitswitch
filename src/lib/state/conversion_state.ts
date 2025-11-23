import { newSimpleState, SimpleState } from "@pkg/simple-state/src/index.ts";
import { Result } from "@/lib/result.ts";
import { Unit } from "@/lib/units.ts";
import { ConversionConfig } from "@/lib/conversions/config.tsx";
import { configState } from "@/lib/config.ts";
import { lastInputState } from "@/lib/last_input.ts";

export type ConversionStateManager = {
  inputState: SimpleState<number>;
  unitState: SimpleState<Unit>;
  conversionStates: Map<Unit, SimpleState<Result<number>>>;
  cleanup: () => void;
};

export function newConversionStateManager(
  conversions: ConversionConfig[],
  initialAmount: number,
  initialUnit: Unit,
): ConversionStateManager {
  const inputState = newSimpleState<number>(initialAmount);
  const unitState = newSimpleState<Unit>(initialUnit);
  const conversionStates = new Map<Unit, SimpleState<Result<number>>>();

  // Initialize conversion states
  for (const config of conversions) {
    const result = config.converter(unitState.get(), inputState.get());
    const state = newSimpleState<Result<number>>(result);
    conversionStates.set(config.unit, state);
  }

  // Update all conversions
  function updateConversions(unit: Unit, input: number): void {
    for (const config of conversions) {
      const result = config.converter(unit, input);
      conversionStates.get(config.unit)?.set(result);
    }
  }

  // Subscribe to input changes
  const inputSubscriptionId = inputState.subscribe(
    function inputCallback(newInput: number): void {
      updateConversions(unitState.get(), newInput);
    },
  );

  // Subscribe to unit changes
  const unitSubscriptionId = unitState.subscribe(
    function unitCallback(newUnit: Unit): void {
      updateConversions(newUnit, inputState.get());
    },
  );

  // Subscribe to config changes
  const configSubscriptionId = configState.subscribe(
    function configCallback(): void {
      updateConversions(unitState.get(), inputState.get());
    },
  );

  // Subscribe to persist input changes
  const inputPersistSubscriptionId = inputState.subscribe(
    function saveInputCallback(newAmount: number): void {
      lastInputState.set({
        amount: newAmount,
        unit: unitState.get(),
      });
    },
  );

  // Subscribe to persist unit changes
  const unitPersistSubscriptionId = unitState.subscribe(
    function saveUnitCallback(newUnit: Unit): void {
      lastInputState.set({
        amount: inputState.get(),
        unit: newUnit,
      });
    },
  );

  // Cleanup function to unsubscribe all listeners
  function cleanup(): void {
    inputState.unsubscribe(inputSubscriptionId);
    unitState.unsubscribe(unitSubscriptionId);
    configState.unsubscribe(configSubscriptionId);
    inputState.unsubscribe(inputPersistSubscriptionId);
    unitState.unsubscribe(unitPersistSubscriptionId);
  }

  return {
    inputState,
    unitState,
    conversionStates,
    cleanup,
  };
}
