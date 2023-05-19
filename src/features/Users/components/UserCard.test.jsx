import { render, fireEvent } from "@testing-library/react";
import { UserCard } from "./UserCard";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("UserCard", () => {
  const user = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    avatar: "avatar.png",
  };

  it("navigates to the user edit page on click", () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);

    const { container } = render(<UserCard user={user} />);

    // eslint-disable-next-line testing-library/no-node-access
    const userCard = container.firstChild;
    fireEvent.click(userCard);

    expect(navigateMock).toHaveBeenCalledWith(`/users/edit/${user.id}`);
  });

  it("displays user information correctly", () => {
    const { getByText, getByAltText } = render(<UserCard user={user} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByAltText("avatar")).toHaveAttribute("src", "avatar.png");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText("John Doe")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText("johndoe@example.com")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText("View Profile")).toBeInTheDocument();
  });
});
