import { render, fireEvent } from "@testing-library/react";
import { UserList } from "./UserList";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("UserList", () => {
  const users = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      avatar: "avatar1.png",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      avatar: "avatar2.png",
    },
  ];

  it("navigates to the user edit page on user card click", () => {
    const navigateMock = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigateMock);

    const { getByTestId } = render(<UserList users={users} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/no-node-access
    const userCards = getByTestId("users-list").querySelectorAll(".user-card");
    fireEvent.click(userCards[0]);

    expect(navigateMock).toHaveBeenCalledWith(`/users/edit/${users[0].id}`);
  });

  it("renders all user cards correctly", () => {
    const { getByTestId } = render(<UserList users={users} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/no-node-access
    const userCards = getByTestId("users-list").querySelectorAll(".user-card");

    expect(userCards.length).toBe(users.length);

    users.forEach((user, index) => {
      const userCard = userCards[index];

      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/no-node-access
      expect(userCard.querySelector("img")).toHaveAttribute("src", user.avatar);
      expect(userCard).toHaveTextContent(`${user.firstName} ${user.lastName}`);
      expect(userCard).toHaveTextContent(user.email);
      // eslint-disable-next-line testing-library/prefer-screen-queries, testing-library/no-node-access
      expect(userCard.querySelector(".button-view")).toBeInTheDocument();
    });
  });
});
