import { useState, useCallback } from "react";

function useHttp(requestFn) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendRequest = useCallback(
    async (requestData) => {
      setIsLoading(true);
      setError(null);

      try {
        const responseData = await requestFn(requestData);
        setData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [requestFn]
  );

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}

export default useHttp;
