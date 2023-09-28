import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import UserInput from "@/user_input";
import { Unit } from "@/units";

describe("UserInput component", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    mockCallback.mockClear();
  });

  it("renders with initial values", () => {
    const { getByText, getByDisplayValue } = render(
      <UserInput input={42} type={Unit.Pixels} callback={mockCallback} />,
    );

    expect(getByDisplayValue("42")).toBeInTheDocument();
    expect(getByText("Pixels")).toBeInTheDocument();
  });

  it("calls the callback when input value changes", () => {
    const { getByDisplayValue } = render(
      <UserInput input={42} type={Unit.Pixels} callback={mockCallback} />,
    );
    const inputElement = getByDisplayValue("42");

    fireEvent.change(inputElement, { target: { value: "55" } });

    expect(mockCallback).toHaveBeenCalledWith(55, Unit.Pixels);
  });

  it("calls the callback when unit selection changes", () => {
    const { getByTestId } = render(
      <UserInput input={42} type={Unit.Rems} callback={mockCallback} />,
    );
    const selectElement = getByTestId("unit-type");

    fireEvent.change(selectElement, { target: { value: Unit.Rems } });

    expect(mockCallback).toHaveBeenCalledWith(42, Unit.Rems);
  });
});
