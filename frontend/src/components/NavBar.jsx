import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthManager";

import { Container, Nav, Navbar, NavDropdown, Tooltip } from "react-bootstrap";

import "../styling/NavBar.css";
import clawLogo from "../assets/clawLogo.webp";

function NavBar() {
  const { user } = useAuth();
  const { Logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const activePage = location.pathname;

  const LoggingOut = () => {
    Logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="nav-bar">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            alt="Claw Logo"
            src={clawLogo}
            width="120px"
            height="auto"
            className="d-inline-block align-top nav-logo-image"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className=" justify-content-evenly var-font"
            style={{
              "--font": "var(--inter)",
              "--font-size": "var(--fs-16px)",
              "--font-weight": "550",
              width: "90%",
            }}
          >
            <Nav.Link
              style={
                activePage === "/"
                  ? { color: "var(--blue)" }
                  : { color: "black" }
              }
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              style={
                activePage === "/AnimalGallery"
                  ? { color: "var(--blue)" }
                  : { color: "black" }
              }
              onClick={() => {
                navigate("/AnimalGallery");
              }}
            >
              Animal Gallery
            </Nav.Link>
            <Nav.Link
              style={
                activePage === "/VirtualAdoption"
                  ? { color: "var(--blue)" }
                  : { color: "black" }
              }
              onClick={() => {
                navigate("/VirtualAdoption");
              }}
            >
              Virtual Adoption
            </Nav.Link>
            {/* <Nav.Link
              style={activePage === "/" ? "active-page" : ""}
              href="#link"
            >
              Donations
            </Nav.Link> */}
          </Nav>
          <Nav
            className="var-font"
            style={{
              "--font": "var(--inter)",
              "--font-size": "var(--fs-16px)",
              "--font-weight": "550",
            }}
          >
            {!user ? (
              <Nav.Link
                id="login-link"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                Login
              </Nav.Link>
            ) : (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                {user.role === "admin" ? (
                  <NavDropdown.Item
                    id="nav-link-dashboard"
                    onClick={() => {
                      navigate("/Dashboard");
                    }}
                  >
                    Dashboard
                  </NavDropdown.Item>
                ) : (
                  <></>
                )}

                {animals.length > 0 && (
                  <NavDropdown.Item
                    id="nav-link-animals"
                    onClick={() => {
                      navigate("/AnimalProfile", {
                        state: { animalId: animals[0] },
                      });
                    }}
                  >
                    Backed Animals
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item id="logout-link" onClick={LoggingOut}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
