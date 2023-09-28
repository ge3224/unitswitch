import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "@/modal";
import { Unit } from "@/units";

describe("Modal Component", () => {
  const containerId = "modal-container";
  const inputId = "modal-input";

  it("renders without crashing", () => {
    const { container } = render(
      <Modal type={Unit.Pixels} callback={() => {}} hotkey="Ctrl+M" />,
    );
    expect(container).toBeTruthy();
  });

  it("opens the modal when the hotkey is pressed", () => {
    const { getByTestId } = render(
      <Modal type={Unit.Pixels} callback={() => {}} hotkey="Ctrl+M" />,
    );

    // Simulate the hotkey press (Ctrl+M)
    fireEvent.keyDown(document, { key: "M", ctrlKey: true });

    // Check if the modal is open
    expect(getByTestId(inputId)).toBeInTheDocument();
  });

  it("closes the modal when the escape key is pressed", () => {
    const { getByTestId, queryByTestId } = render(
      <Modal type={Unit.Pixels} callback={() => {}} hotkey="Ctrl+M" />,
    );

    // Open the modal first
    fireEvent.keyDown(document, { key: "M", ctrlKey: true });

    // Check if the modal is open
    expect(getByTestId(inputId)).toBeInTheDocument();

    // Simulate the escape key press
    fireEvent.keyDown(document, { key: "Escape" });

    // Check if the modal is closed
    expect(
      queryByTestId(containerId)?.classList.contains("hidden"),
    ).toBeTruthy();
  });

  it("calls the callback function when the form is submitted", () => {
    const mockCallback = jest.fn();

    const { getByTestId, getByText } = render(
      <Modal type={Unit.Pixels} callback={mockCallback} hotkey="Ctrl+M" />,
    );

    // Open the modal first
    fireEvent.keyDown(document, { key: "M", ctrlKey: true });

    // Fill in the input field with a valid value:unit format
    // const input = getByLabelText('Enter a Unit and a Value, value:unit');
    const input = getByTestId(inputId);
    fireEvent.change(input, { target: { value: "10:meters" } });

    // Submit the form
    fireEvent.submit(getByText("Submit"));

    // Check if the callback function was called with the expected values
    expect(mockCallback).toHaveBeenCalledWith(10, "Pixels");
  });

  it("closes the modal when the form is submitted", () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <Modal type={Unit.Pixels} callback={() => {}} hotkey="Ctrl+M" />,
    );

    // Open the modal first
    fireEvent.keyDown(document, { key: "M", ctrlKey: true });

    // Fill in the input field with a valid value:unit format
    const input = getByTestId(inputId);
    fireEvent.change(input, { target: { value: "10:meters" } });

    // Submit the form
    fireEvent.submit(getByText("Submit"));

    // Check if the modal is closed
    expect(
      queryByTestId(containerId)?.classList.contains("hidden"),
    ).toBeTruthy();
  });
});
