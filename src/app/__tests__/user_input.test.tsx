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

  test("renders with given props", () => {
    const { getByLabelText, getByTestId } = render(
      <UserInput input={0} type={Unit.Pixels} callback={() => { }} />
    );

    expect(getByLabelText("Amount:")).toBeInTheDocument();
    expect(getByTestId("unit-type")).toBeInTheDocument();
  });

  test("calls callback function on form submit with valid input", () => {
    const mockCallback = jest.fn();
    const { getByLabelText, getByText } = render(
      <UserInput input={0} type={Unit.Pixels} callback={mockCallback} />
    );

    fireEvent.change(getByLabelText("Amount:"), { target: { value: "25" } });
    fireEvent.change(getByLabelText("Unit:"), {
      target: { value: Unit.Rems },
    });
    fireEvent.submit(getByText("Convert"));

    expect(mockCallback).toHaveBeenCalledWith(25, Unit.Rems);
  });

  test("displays warning for invalid input", () => {
    const mockCallback = jest.fn();
    const { getByLabelText, getByText } = render(
      <UserInput input={0} type={Unit.Pixels} callback={mockCallback} />
    );

    fireEvent.change(getByLabelText("Amount:"), { target: { value: "invalid" } });
    fireEvent.submit(getByText("Convert"));

    expect(getByText("Please type number.")).toBeInTheDocument();
  });
});
