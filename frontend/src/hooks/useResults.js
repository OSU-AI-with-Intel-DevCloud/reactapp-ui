import React, { useState, useEffect } from "react";

function useResults(path) {
  const [result, setResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function fetchSearchResults() {
      let responseBody = {};
      setLoading(true);
      try {
        const response = await fetch(`/results/${path.path}`, {
          signal: controller.signal
        });
        responseBody = await response.json();
        console.log(responseBody);
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("== HTTP request cancelled");
        } else {
          setError(true);
          throw e;
        }
      }
      if (!ignore) {
        setLoading(false);
        setError(responseBody.message === 0 ? false : responseBody.message);
        setResult(
          responseBody
        );
      }
    }
    if (path) {
      console.log(path);
      console.log(Date.now());
      if (Date.now() - path.time < 100) {
        fetchSearchResults();
      }
    }
    return () => {
      controller.abort();
      ignore = true;
    };
  }, [path]);

  return [result, isLoading, error];
}

export default useResults;
