import React from "react";
import { StyledPost, StyledPostHeader } from "./styled/Feed.styled";


const Journey = React.memo(({ post }) => {
  return (
    <StyledPost>
      {/* <StyledPostHeader> */}
        {/* <img src={user._json.picture} alt="profile img" /> */}
        {/* <img src={post.picture} alt="profile img" /> */}
      {/* </StyledPostHeader> */}
      {/* <p>{post.rows}</p> */}
      <pre>{JSON.stringify(post, null, 2)}</pre>
      {/* <p>Name: {post.train_id}</p> */}
      {/* <br></br> */}
      {/* <p>Email: {post.email}</p> */}
      {/* <br></br> */}
    </StyledPost>
  );
});

export default Journey;
