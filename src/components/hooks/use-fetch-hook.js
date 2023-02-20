import { useState, useCallback } from "react";

const useFetchHook = () => {
  const [errorState, setErrorState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async ({ method = "GET", body = null, headers = null }, transformData) => {
      setIsLoading(true);
      try {
        const url =
          "https://tasks-app-5a654-default-rtdb.firebaseio.com//tasks.json";
        const response = await fetch(url, {
          method,
          body,
          headers: headers ?? {},
        });
        setIsLoading(false);
        if (!response.ok) {
          throw new Error("Request Failed!");
        }
        const data = await response.json();
        transformData(data, body ? body : null);
      } catch (err) {
        setIsLoading(false);
        console.log("Some Error Occured!", err);
        setErrorState(err?.message ?? "Something went wrong!");
      }
    },
    []
  );

  return {
    isLoading,
    errorState,
    sendRequest,
  };
};

export default useFetchHook;
