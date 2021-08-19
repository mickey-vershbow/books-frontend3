import React from "react";
import { useAppState } from "../../AppState.jsx";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SidebarRoute,
  SideBtnWrap,
} from "./SidebarElements.jsx";

const Sidebar = ({ isOpen, toggle }) => {
  const { state, dispatch } = useAppState();

  const { url } = state;
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {!state.token ? (
            <>
              <SidebarLink
                to="/auth/signup"
                // onClick={toggle}
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Sign Up
              </SidebarLink>
              <SidebarLink
                to="/auth/login"
                onClick={toggle}
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Log In
              </SidebarLink>
            </>
          ) : null}
          {state.token ? (
            <>
              <SidebarLink
                to="/dashboard"
                onClick={toggle}
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Dashboard
              </SidebarLink>
              <div
                id="btn-logout"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
                onClick={() => {
                  dispatch({ type: "logout" });
                  {
                    toggle;
                  }
                  props.history.push("/");
                }}
              >
                Logout
              </div>
              <SidebarLink
                to="signup"
                onClick={toggle}
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Sign Up
              </SidebarLink>
            </>
          ) : null}
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/home">Home</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
