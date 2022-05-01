import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux";
const Header = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUser());
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Pay-lolly</Navbar.Brand>
          <Nav className="me-auto navbar_wrapper">
            {user ? (
              <>{<NavLink to="/tasks">Tasks</NavLink>}</>
            ) : (
              <>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "active-link" : "none"
                  }
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "active-link" : "none"
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </Nav>
          {user ? (
            <Nav>
              <NavDropdown title={user && user.name}>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : null}
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
