import useFetch from "../../../hooks/useFetch";
import store from "../../../reducers/store";

export default function useBudget(defaultValue) {
  const userId = store.getState().user?.userId;
  return useFetch("budget", defaultValue, { userId });
}
