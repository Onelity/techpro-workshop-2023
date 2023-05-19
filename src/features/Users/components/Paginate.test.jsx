import { render, fireEvent } from "@testing-library/react";
import { Paginate } from "./Paginate";

describe("Paginate", () => {
  const previousPageMock = jest.fn();
  const nextPageMock = jest.fn();

  beforeEach(() => {
    previousPageMock.mockClear();
    nextPageMock.mockClear();
  });

  it("calls previousPage function when Previous button is clicked", () => {
    const { getByRole } = render(
      <Paginate previousPage={previousPageMock} nextPage={nextPageMock} />
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const previousButton = getByRole("button", { name: "Previous" });
    fireEvent.click(previousButton);

    expect(previousPageMock).toHaveBeenCalled();
    expect(nextPageMock).not.toHaveBeenCalled();
  });

  it("calls nextPage function when Next button is clicked", () => {
    const { getByRole } = render(
      <Paginate previousPage={previousPageMock} nextPage={nextPageMock} />
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const nextButton = getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);

    expect(nextPageMock).toHaveBeenCalled();
    expect(previousPageMock).not.toHaveBeenCalled();
  });
});
