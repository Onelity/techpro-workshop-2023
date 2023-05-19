import React from "react";
import { render, screen } from "@testing-library/react";
import { NoPage } from "./NoPage";

test('renders "No page found" text', () => {
  // Render the component
  render(<NoPage />);

  // Assert that the "No page found" text is present
  const textElement = screen.getByText("No page found");
  expect(textElement).toBeInTheDocument();
});
