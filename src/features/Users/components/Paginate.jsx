import { Button } from "../../../components/UI/Button";

export const Paginate = ({ previousPage, nextPage }) => {
  return (
    <div className="pagination-container">
      <Button
        id="btnPrevious"
        type="Submit"
        className="btn-reset mr-10"
        value="Previous"
        clickHandler={previousPage}
      />
      <Button
        id="btnNext"
        type="Submit"
        className="btn-reset"
        value="Next"
        clickHandler={nextPage}
      />
    </div>
  );
};
