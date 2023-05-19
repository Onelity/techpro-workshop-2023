import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { UserForm } from "./UserForm";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

// Mock the response for successful requests
mockAxios.onPost("https://onelity.azurewebsites.net/users").reply(200, {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  avatar: "https://example.com/avatar.jpg",
});
mockAxios.onPut("https://onelity.azurewebsites.net/users/1").reply(200, {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  avatar: "https://example.com/avatar.jpg",
});
mockAxios.onDelete("https://onelity.azurewebsites.net/users/1").reply(200);

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("UserForm", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders the form fields", () => {
    render(<UserForm />);
    const firstNameInput = screen.getByLabelText("First name");
    const lastNameInput = screen.getByLabelText("Last name");
    const emailInput = screen.getByLabelText("Email");
    const phoneInput = screen.getByLabelText("Phone");
    const avatarInput = screen.getByLabelText("Avatar");
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(avatarInput).toBeInTheDocument();
  });

  test("updates form values and validations on input change", () => {
    render(<UserForm />);
    const firstNameInput = screen.getByLabelText("First name");
    const lastNameInput = screen.getByLabelText("Last name");
    const emailInput = screen.getByLabelText("Email");
    const phoneInput = screen.getByLabelText("Phone");
    const avatarInput = screen.getByLabelText("Avatar");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(avatarInput, { target: { value: "www.url-example.com" } });

    expect(firstNameInput.value).toBe("John");
    expect(lastNameInput.value).toBe("Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(phoneInput.value).toBe("1234567890");
    expect(avatarInput.value).toBe("www.url-example.com");
  });

  test("should call axios.post when saving a new user", async () => {
    // Render the UserForm component
    render(<UserForm />);

    // Fill in the form values
    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Avatar"), {
      target: { value: "https://example.com/avatar.jpg" },
    });

    // Mock the axios.post request
    const postMock = jest.spyOn(axios, "post");

    // Trigger the save button click
    fireEvent.click(screen.getByText("Save"));

    // Wait for the axios.post request to complete
    await waitFor(() => {
      expect(postMock).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(postMock).toHaveBeenCalledWith(
        "https://onelity.azurewebsites.net/users",
        {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          avatar: "https://example.com/avatar.jpg",
        }
      );
    });
  });

  test("submits the form with PUT request when saving an existing user", async () => {
    const user = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      avatar: "https://example.com/avatar.jpg",
    };

    // Render the UserForm component with the user prop
    render(<UserForm user={user} />);

    // Mock the axios.put request
    const putMock = jest.spyOn(axios, "put");

    // Trigger the save button click
    fireEvent.click(screen.getByText("Save"));

    // Wait for the axios.put request to complete
    await waitFor(() => {
      expect(putMock).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(putMock).toHaveBeenCalledWith(
        "https://onelity.azurewebsites.net/users/1",
        user
      );
    });
  });

  test("should call deleteClickHandler when Delete button is clicked", async () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);

    const user = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      avatar: "www.url-example.com",
    };
    render(<UserForm user={user} />);

    const deleteButton = screen.getByText("Delete");

    // Render the UserForm component with the user prop
    render(<UserForm user={user} />);

    // Mock the axios.delete request
    const deleteMock = jest.spyOn(axios, "delete");

    // Trigger the delete button click
    fireEvent.click(deleteButton);

    // Wait for the axios.delete request to complete
    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(deleteMock).toHaveBeenCalledWith(
        "https://onelity.azurewebsites.net/users/1"
      );
    });
  });

  test("deletes the user and navigates when delete button is clicked", async () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);

    const user = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      avatar: "avatar-url",
    };
    axios.delete.mockResolvedValueOnce({});

    render(<UserForm user={user} />);
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        `https://onelity.azurewebsites.net/users/${user.id}`
      );
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(navigateMock).toHaveBeenCalledWith("/users");
    });
  });
});
