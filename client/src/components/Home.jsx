import React from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
// import image from "./home.jpg"; //kanamma TODO
import StyledFeed from "./styled/Feed.styled";

const Home = (req) => {
  const user = useContext(UserContext);
  return (
    <StyledFeed>
      <main>
        {/* <img src={image} alt="Home" className="absolute object-cover w-full h-full"/> */}
        <section className="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
          <br></br>
          <h1 className="text-align left text-6xl text-green-100 font-bold cursive leading-none lg:leading-snug home-name">Aloha {user.displayName}</h1>
          <br></br>
          Welcome to Trawell Buddy.
          <br></br>
          <br></br>
          Before, you sail on a journey to find your Buddy, please add your Journey details in the Account section so that others can find you!
          <br></br>
          <br></br>
          <br></br>We hope you find what you are looking for. Cheers!
        </section>
      </main>
      </StyledFeed>
  );
};


export default Home;