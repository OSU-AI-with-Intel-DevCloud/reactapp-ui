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
          signal: controller.signal,
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
          [
            responseBody.b1,
            responseBody.b2,
            responseBody.b3,
            responseBody.b4,
            responseBody.b5,
            responseBody.b6,
            responseBody.b7,
            responseBody.b8,
            responseBody.b9,
            responseBody.b10,
            responseBody.b11,
            responseBody.b12,
          ] || []
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
