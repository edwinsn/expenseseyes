import store from "../reducers/store";
import axios from "axios";

let updatedBudget = async function ({  expected, category }) {
  const userId = store.getState()?.user?.userId;
  const newBudget = {
    expected,
    category,
    userId,
  };

  return await axios.post(
    process.env.REACT_APP_PURCHASES_URI + "budget",
    newBudget
  );
};

export default updatedBudget;
