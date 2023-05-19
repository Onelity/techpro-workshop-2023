import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

test("renders Button component with props", () => {
  // Set up test props
  const testProps = {
    id: "my-button",
    className: "custom-button",
    clickHandler: jest.fn(),
    type: "submit",
    isDisabled: false,
    value: "Click Me",
  };

  render(<Button {...testProps} />);

  // Assert that the button element is rendered
  const buttonElement = screen.getByRole("button", { name: /click me/i });
  expect(buttonElement).toBeInTheDocument();

  // Assert that the button has the correct attributes and classes
  expect(buttonElement).toHaveAttribute("id", "my-button");
  expect(buttonElement).toHaveClass("btn");
  expect(buttonElement).toHaveClass("btn-enable");
  expect(buttonElement).toHaveClass("custom-button");
  expect(buttonElement).toHaveTextContent("Click Me");

  // Simulate a button click
  fireEvent.click(buttonElement);

  // Assert that the click handler has been called
  expect(testProps.clickHandler).toHaveBeenCalled();
});
