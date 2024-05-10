const GRAPHQL_URL = process.env.WORDPRESS_LOCAL_API_URL;

export const fetchApi = async (query) => {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("fetch fail: " + err.message || "Something went wrong");
  }
};
