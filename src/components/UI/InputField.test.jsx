import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from "./InputField";

test("renders InputField component with required props", () => {
  // Set up required test props
  const testProps = {
    value: "Test Value",
    onChange: jest.fn(),
  };

  render(<InputField {...testProps} />);

  // Assert that the input element is rendered with the correct value
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveValue("Test Value");
});

test("renders InputField component with optional props", () => {
  // Set up optional test props
  const testProps = {
    value: "Test Value",
    label: "Test Label",
    name: "testName",
    placeholder: "Test Placeholder",
    type: "text",
    onChange: jest.fn(),
    error: "Test Error",
  };

  render(<InputField {...testProps} />);

  // Assert that the label, input, and error message are rendered
  const labelElement = screen.getByText("Test Label");
  expect(labelElement).toBeInTheDocument();

  const inputElement = screen.getByPlaceholderText("Test Placeholder");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute("value", "Test Value");
  expect(inputElement).toHaveAttribute("name", "testName");

  const errorElement = screen.getByText("Test Error");
  expect(errorElement).toBeInTheDocument();
});

// test("calls the onChange handler on input change", () => {
//   const onChange = jest.fn();

//   render(<InputField value="" onChange={onChange} />);

//   const inputElement = screen.getByRole("textbox");
//   fireEvent.change(inputElement, { target: { value: "New Value" } });

//   expect(onChange).toHaveBeenCalledTimes(1);
//   expect(onChange).toHaveBeenCalledWith(expect.any(Object));
//   expect(onChange.mock.calls[0][0].target.value).toBe("New Value");

//   // Assert that the input field value is updated
//   expect(inputElement).toHaveValue("New Value");
// });

test("renders without label and error when not provided", () => {
  const testProps = {
    value: "Test Value",
    onChange: jest.fn(),
  };

  render(<InputField {...testProps} />);

  const labelElement = screen.queryByText("Test Label");
  expect(labelElement).toBeNull();

  const errorElement = screen.queryByText("Test Error");
  expect(errorElement).toBeNull();
});
