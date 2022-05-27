import React, { useState, useEffect } from "react";

function useFile(click) {
  const [resultPath, setResult] = useState([]);
  const [isLoadingPath, setLoading] = useState(false);
  const [errorPath, setError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function fetchSearchResults() {
      let responseBody = {};
      setLoading(true);
      try {
        const response = await fetch(`/path`, {  //http://localhost:5000
          signal: controller.signal
          // method: 'GET',
          // mode: 'cors'
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
        const filePath = responseBody.replaceAll("/", "\\");
        setResult(filePath);
      }
    }
    if (click) {
      console.log(click);
      console.log(Date.now());
      if (Date.now() - click < 100) {
        fetchSearchResults();
      }
    }
    return () => {
      controller.abort();
      ignore = true;
    };
  }, [click]);

  return [resultPath, isLoadingPath, errorPath];
}

export default useFile;
