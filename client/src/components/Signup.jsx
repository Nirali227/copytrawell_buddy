import StyledSignup, { SignupButton } from "./styled/Signup.styled";

const Signup = () => {
  const Signin = e => {
    e.preventDefault();
    const str = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
    window.open(str, "_self");
  };
  return (
    <StyledSignup>
      <form onSubmit={Signin}>
        <div>
          <h1>Trawell Buddy</h1>
          <sub>Copied from internet by ghongha</sub>
        </div>
        <SignupButton>
        <i className="fa-brands fa-google" /><p> Sign in with Google</p>
        </SignupButton>
      </form>
    </StyledSignup>
  );
};

export default Signup;