import { useState } from "react";
import { Link } from "react-router-dom";
import StyledNav, {
  DesktopMenu,
  HamburgerButton,
  MobileMenu,
} from "./styled/Nav.styled";
import { PostModalButton } from "./styled/PostModal.styled";

const Nav = ({ setModal }) => {
  const [navOpen, setNav] = useState(false);
  return (
    <StyledNav>
      <HamburgerButton className="fas fa-bars" onClick={() => setNav(c => !c)} />

      <MobileMenu open={navOpen}>
        <Links setNav={setNav} setModal={setModal} />
      </MobileMenu>

      <DesktopMenu>
        <Links setNav={null} setModal={setModal} />
      </DesktopMenu>
    </StyledNav>
  );
};

export default Nav;

const Links = ({ setNav, setModal }) => (
  <>
    <Link
      to="/"
      onClick={() => {
        if (setNav) setNav(false);
      }}
    >
      <h1>Trawell Buddy</h1>
    </Link>
    <Link
      to="/account"
      onClick={() => {
        if (setNav) setNav(false);
      }}
    >
      <p>Account</p>
    </Link>
    <Link
      to="/feed"
      onClick={() => {
        if (setNav) {
          setNav(false);
        }
      }}
    >
      <p>My Journeys</p>
    </Link>
    <Link
      to="/search"
      onClick={() => {
        if (setNav) {
          setNav(false);
        }
      }}
    >
      <p>Find Buddy</p>
    </Link>

    <PostModalButton
      onClick={() => {
        if (setNav) setNav(false);
        setModal(c => !c);
      }}
      className="fas fa-plus"
    />
  </>
);