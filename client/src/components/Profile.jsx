import React from "react";
import { StyledPost, StyledPostHeader } from "./styled/Feed.styled";


const Profile = React.memo(({ profile }) => {
  return (
    <StyledPost>
      <StyledPostHeader>
        <img src={profile.picture} alt="profile img" />
      </StyledPostHeader>
      <p>Name: {profile.displayname}</p>
      <br></br>
      <p>Email: {profile.email}</p>
      <br></br>
    </StyledPost>
  );
});

export default Profile;
