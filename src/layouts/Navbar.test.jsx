import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./Navbar";

test("renders Navbar component with links", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  // Assert that the "Users" link is rendered
  const usersLink = screen.getByRole("link", { name: /users/i });
  expect(usersLink).toBeInTheDocument();
  expect(usersLink.getAttribute("href")).toBe("/users");

  // Assert that the "New User" link is rendered
  const newUserLink = screen.getByRole("link", { name: /new user/i });
  expect(newUserLink).toBeInTheDocument();
  expect(newUserLink.getAttribute("href")).toBe("/users/new");
});
