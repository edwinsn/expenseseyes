import { useEffect } from "react";
import { useReportAxiosErrors } from "./AxiosInterceptors";

function ReportAxiosErrorsWrapper(props) {
  const ejectInterceptor = useReportAxiosErrors();

  useEffect(() => {
    // Eject the interceptor when the component unmounts
    return () => {
      ejectInterceptor();
    };
  }, [ejectInterceptor]);

  return props.children;
}

export default ReportAxiosErrorsWrapper;
