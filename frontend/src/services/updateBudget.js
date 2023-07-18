import store from "../reducers/store";
import axios from "axios";

let updatedBudget = async function ({ budgetId, expected, category, date }) {
  const userId = store.getState()?.userId;
  const newBudget = {
    id: budgetId,
    expected,
    category,
    userId,
    date,
  };

  return await axios.put(
    process.env.REACT_APP_PURCHASES_URI + "budget",
    newBudget
  );
};

export default updatedBudget;
