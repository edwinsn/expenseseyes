import { useQuery } from "react-query";
import axios from "axios";

export default function useFetch(
  url,
  defaultValue,
  params = {},
  reactQueryParams = {}
) {
  const { isLoading, data, refetch } = useQuery({
    queryKey: url,
    queryFn: () => {
      const endpoint = `${process.env.REACT_APP_PURCHASES_URI}${url}`;

      return axios.get(endpoint, {
        params,
      });
    },
    ...reactQueryParams,
  });

  let dataExtracted;

  //Get the data requested
  dataExtracted = data?.data || data;

  //Check if there is data
  let isThereData = Array.isArray(dataExtracted)
    ? dataExtracted.length !== 0
    : typeof data === "object" && Object.values(data || {}).length !== 0;

  const noData = !isThereData && !isLoading;

  return [dataExtracted || defaultValue, isLoading, noData, refetch];
}
