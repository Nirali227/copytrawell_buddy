import useSearch, { fetchSearchResults } from "./hooks/useSearch";
import Journey from "./Journey";
import StyledFeed from "./styled/Feed.styled";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

const fetchData = async (query, cb) => {
  console.warn("fetching " + query);
  const res = await fetchSearchResults(query);
  cb(res);
};

const debouncedFetchData = debounce((query, cb) => {
  fetchData(query, cb);
}, 500);

const SearchInput = ({ value, onChangeText }) => {
  useEffect(() => {
    let input = document.querySelector("input");
    input.addEventListener("input", onChangeText);
    return input.removeEventListener("input", onChangeText);
  }, []);

  return (
    <div className="search-container ">
      <input
        type="text"
        value={value}
        onChange={onChangeText}
        placeholder="Only Search Departure is supported for now. Example: Delhi"
        style={{ width: "100%", height: "30px" }}
      />
    </div>
  );
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearch(
    "search",
    query
  );
  useEffect(() => {
    debouncedFetchData(query, (res) => {
      setResults(res);
    });
  }, [query]);

  return (
    <StyledFeed>
      <h1>Your Buddies</h1>
      <SearchInput
        value={query}
        onChangeText={(e) => {
          setQuery(e.target.value);
        }}
      />
      {results?.posts?.map((post) => (
        <Journey post={post} />
      ))}
    </StyledFeed>
  );
};

export default Search;

// import useSearch from "./hooks/useSearch";
// import Journey from "./Journey";
// import StyledFeed, { LoadMoreButton } from "./styled/Feed.styled";

// const SearchBar = () => (
//   <form action="/search" method="get">
//       <label htmlFor="header-search">
//           <span className="visually-hidden">Search buddy</span>
//       </label>
//       <input
//           type="text"
//           id="header-search"
//           placeholder="Search buddy"
//           name="s"
//       />
//       <button type="submit">Search</button>
//   </form>
// );

// const Search = () => {
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearch();
//   <h2>{console.log("Search Data is>>>>>>>>>>>>>>>>", data)}</h2>
//   return (
//     <StyledFeed>
//       <h1>Your Buddies</h1>
//       { SearchBar() }
//       {data?.pages?.map(page => page.posts.map(post => <Journey post={post} />))}

//       <LoadMoreButton>
//         {hasNextPage && !isFetchingNextPage && (
//           <button onClick={() => fetchNextPage()}>Load More</button>
//         )}
//       </LoadMoreButton>
//     </StyledFeed>
//   );
// };

// export default Search;
