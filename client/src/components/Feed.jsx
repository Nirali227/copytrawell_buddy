import useFeed from "./hooks/useFeed";
import Journey from "./Journey";
import StyledFeed, { LoadMoreButton } from "./styled/Feed.styled";

const Feed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeed();
  return (
    <StyledFeed>
      <h1>My Journeys</h1>

      {data?.pages?.map((page) =>
        page.posts.map((post) => <Journey post={post} />)
      )}

      <LoadMoreButton>
        {hasNextPage && !isFetchingNextPage && (
          <button onClick={() => fetchNextPage()}>Load More</button>
        )}
      </LoadMoreButton>
    </StyledFeed>
  );
};

export default Feed;
