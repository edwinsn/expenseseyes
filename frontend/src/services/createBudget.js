import store from "../reducers/store";
import axios from "axios";

let createBudget = async function ({ expected, category, date }) {
  const userId = store.getState()?.user?.userId;
  const newBudget = {
    expected,
    category,
    date,
    userId,
  };

  return await axios
    .post(process.env.REACT_APP_PURCHASES_URI + "budget", newBudget)
    .then((res) => res.data?.budget?._id);
};

export default createBudget;
