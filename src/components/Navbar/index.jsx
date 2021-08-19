import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import { useAppState } from "../../AppState.jsx";
import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavItem,
  NavLinks,
  NavLogo,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements.jsx";


const Navbar = ({ toggle }) => {
  const { state, dispatch } = useAppState();

  const { url } = state;

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavbarContainer>
            <NavLogo className="nav-logo" to="/">Books on Rails</NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              {!state.token ? (
                <>
                  <NavItem>
                    <NavLinks to="/auth/signup" className="nav-link">
                      Sign Up
                    </NavLinks>
                  </NavItem>
                  <NavItem>
                    <NavLinks
                      to="/auth/login"
                      className="nav-link"
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact="true"
                      offset={-80}
                    >
                      Log In
                    </NavLinks>
                  </NavItem>
                </>
              ) : null}
              {state.token ? (
                <>
                  <NavItem>
                    <NavLinks
                      to="/dashboard"
                      className="nav-link"
                      smooth={true}
                      duration={500}
                      spy={true}
                      exact="true"
                      offset={-80}
                    >
                      Dashboard
                    </NavLinks>
                  </NavItem>
                  <div
                    id="btn-logout"
                    onClick={() => {
                      dispatch({ type: "logout" });
                      props.history.push("/");
                    }}
                  >
                    Logout
                  </div>
                </>
              ) : null}
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
