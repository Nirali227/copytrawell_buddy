import { useInfiniteQuery } from "react-query";

const useSearch = (path = "search", query = "") => {
  return useInfiniteQuery(
    `${path}`,
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/${path}?cursor=${pageParam}&s=${query}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("something went wrong server side...");
      }
      return res.json();
    },
    {
      refetchInterval: 1000 * 10,
      getNextPageParam: (lastPage) =>
        lastPage.posts.length >= 5 ? lastPage.cursor : undefined,
    }
  );
};

export default useSearch;

export const fetchSearchResults = async (query) => {
  if (query && query.length > 0) {
    const parsedQuery = query.replaceAll(" ", "+");
    const url = `${process.env.REACT_APP_SERVER_URL}/search?s=${parsedQuery}`;
    const res = await fetch(url, {
      credentials: "include",
    });
    const resJson = res.json();
    return resJson;
  } else {
    const url = `${process.env.REACT_APP_SERVER_URL}/search`;
    const res = await fetch(url, {
      credentials: "include",
    });
    const resJson = res.json();
    return resJson;
  }
};
