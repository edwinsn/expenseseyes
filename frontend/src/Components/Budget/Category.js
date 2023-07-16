import { LoadingCircles } from "../ultils/Loading";
import { useState } from "react";
import DropDown from "../ultils/DropDown";
import PurchasesRelatedToCategory from "../PurchasesRelatedToCategory";
import updatedBudget from "../../services/updateBudget";
import createBudget from "../../services/createBudget";

function Category({
  expected = 0,
  expended = 0,
  category = "Various",
  expenses = [],
  budgetId,
}) {
  let [loading, changeLoading] = useState(false);
  let [updating, changeUpdating] = useState(false);

  let wasMoneySaved = expended < expected;

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    changeLoading(true);
    // eslint-disable-next-line
    if (expected != ev.target[0].value || expended != ev.target[1].value) {
      changeLoading(true);
      changeUpdating(false);
      const formData = new FormData(ev.target);
      const category = formData.get("category");
      const expected = formData.get("expected");
      if (budgetId) await updatedBudget({ category, expected, budgetId });
      else await createBudget({ category, expected });
      changeLoading(false);
    }
  };


  return (
    <DropDown>
      <form
        className="category"
        onSubmit={handleUpdate}
        onChange={() => {
          changeUpdating(true);
        }}
      >
        <div
          className="flex h-100 fb-30"
          onClick={(ev) => ev.stopPropagation()}
        >
          <input
            key={`${category}-budget`}
            type="number"
            name="expected"
            className="bg-blue h-100 text-center grow border-0 text-like w-50"
            defaultValue={expected}
          />
          <input
            key={`${category}-expend`}
            type="number"
            className={`h-100 grow text-center border-0 text-like w-50 ${
              wasMoneySaved ? "bg-green" : "bg-red"
            }`}
            readOnly
            value={expended}
          />
        </div>

        <input
          key={`h-100 category-${category}`}
          className="purchaseCategory"
          type="text"
          name="category"
          onClick={(ev) => ev.stopPropagation()}
          defaultValue={category}
        />

        {<div className="flex align-center mx-1">&#65509;</div>}
        {loading && (
          <div className="loadingBudgetuUpdate">
            <LoadingCircles />
          </div>
        )}
        {updating && <input className="saveBtn" type="submit" value="" />}
      </form>
      <PurchasesRelatedToCategory category={category} expenses={expenses} />
    </DropDown>
  );
}

export default Category;
