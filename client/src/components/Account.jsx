import useFeed from "./hooks/useFeed";
import Profile from "./Profile";
import StyledFeed, { LoadMoreButton } from "./styled/Feed.styled";

const Account = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFeed("my_posts");
  return (
    <StyledFeed>
      <h1>My Profile</h1>
      {data?.pages?.map((page) =>
        page.posts.map((profile) => <Profile profile={profile} />)
      )}
      <LoadMoreButton>
        {hasNextPage && !isFetchingNextPage && (
          <button onClick={() => fetchNextPage()}>Load More</button>
        )}
      </LoadMoreButton>
    </StyledFeed>
  );
};

export default Account;
