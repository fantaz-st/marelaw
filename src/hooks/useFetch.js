import { useState, useCallback } from "react";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL;

const headers = { "Content-Type": "application/json" };

const useFetch = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState([]);

  const sendRequest = useCallback(async (query) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers,
        next: {
          revalidate: 60,
        },
        body: JSON.stringify({
          query,
        }),
      });

      const data = await response.json();
      setFetchData(data.data);
    } catch (err) {
      setError(err);
      console.error(err.message);
    }
    setLoading(false);
  }, []);

  return {
    error,
    sendRequest,
    fetchData,
    loading,
  };
};

export default useFetch;
