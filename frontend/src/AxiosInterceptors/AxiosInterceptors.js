import axios from "axios";
import store from "../reducers/store";
import { addErrorList } from "../reducers/features/errors";

export let useReportAxiosErrors = () => {
  const interceptor = axios.interceptors.response.use(
    function (response) {
      return response;
    },
    /**
     * Intercept any error and saved it in the redux state
     * @param {number} error.response.status - Errors code
     */
    function (error) {
      store.dispatch(
        addErrorList({
          message: error.response?.message || "Sin conexión",
          code: error?.response?.status || "503",
        })
      );
    }
  );

  return () => {
    axios.interceptors.response.eject(interceptor);
  };
};
