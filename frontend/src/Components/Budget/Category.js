import { LoadingCircles } from "../ultils/Loading";
import { useEffect, useState } from "react";
import DropDown from "../ultils/DropDown";
import PurchasesRelatedToCategory from "../PurchasesRelatedToCategory";
import updatedBudget from "../../services/updateBudget";
import createBudget from "../../services/createBudget";

function Category({
  expected: savedExpected = 0,
  expended = 0,
  category = "Various",
  expenses = [],
  budgetId,
  date,
  monthSelected,
  setNewBudgets,
  setLocalBudget,
  localId,
  setNewLocalBudget,
}) {
  const [loading, changeLoading] = useState(false);
  const [updating, changeUpdating] = useState(false);
  const [newId, setNewId] = useState();
  const [expected, setExpected] = useState();

  useEffect(() => {
    setExpected(savedExpected);
  }, [savedExpected]);

  let wasMoneySaved = expended <= expected;

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    changeLoading(true);
    // eslint-disable-next-line
    changeUpdating(false);
    const formData = new FormData(ev.target);
    const category = formData.get("category");
    const expected = formData.get("expected");

    if (budgetId || newId)
      await updatedBudget({
        category,
        expected,
        budgetId: budgetId || newId,
        date,
      });
    else
      await createBudget({ category, expected, date }).then((id) => {
        setNewId(id);
        setNewBudgets((prev) =>
          prev.filter((b) => !(b.category === category && b.date === date))
        );
      });
    changeLoading(false);
  };

  const setLocalCategory = (ev) => {
    const category = ev.target.value;
    if (budgetId) {
      setLocalBudget({
        _id: budgetId,
        category,
      });
    } else {
      setNewLocalBudget({
        localId: localId,
        category,
      });
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
            onChange={(ev) => setExpected(ev.target.value)}
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
          onChange={setLocalCategory}
        />

        {<div className="flex align-center mx-1">&#65509;</div>}
        {loading && (
          <div className="loadingBudgetuUpdate">
            <LoadingCircles />
          </div>
        )}
        {updating && (
          <input
            className="saveBtn"
            onClick={(ev) => ev.stopPropagation()}
            type="submit"
            value=""
          />
        )}
      </form>
      <PurchasesRelatedToCategory category={category} expenses={expenses} />
    </DropDown>
  );
}

export default Category;
