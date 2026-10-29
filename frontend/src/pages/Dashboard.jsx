import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthManager";

import { Container, Row, Col, Button, Form, Modal, Nav } from "react-bootstrap";

import clawLogo from "../assets/clawLogo.webp";
import profileIcon from "../assets/profileIcon.webp";
import SquaresIcon from "../assets/squaresIcon.svg?react";
import DogLogIcon from "../assets/dogLogIcon.svg?react";
import HandAndPawIcon from "../assets/handAndPawIcon.svg?react";
import BufferIcon from "../assets/bufferIcon.svg?react";
import GearIcon from "../assets/gearIcon.svg?react";
import ExitIcon from "../assets/exitIcon.svg?react";

import AnimalAddFrom from "../components/Dashboard/AnimalAddForm";
import DashboardMain from "../components/dashboard/DashboardMain";
import AnimalList from "../components/dashboard/AnimalList";
import UserList from "../components/dashboard/UserList";

import "../styling/Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const { Logout } = useAuth();

  const navigate = useNavigate();

  const LoggingOut = () => {
    Logout();
    navigate("/");
  };

const API = "https://claw-api-cl.duckdns.org/api";

  const [animals, setAnimals] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAnimals = async () => {
      try {
        const response = await fetch(API + "/dog");
        const animalData = await response.json();

        //console.log(data);

        setAnimals(animalData);
      } catch (error) {
        console.error("The backend has ran away...", error);
      }
    };

    const getUsers = async () => {
      try {
        const response = await fetch(API + "/auth");
        const userData = await response.json();

        //console.log(data);

        setUsers(userData);
      } catch (error) {
        console.error("The backend has ran away...", error);
      }
    };

    getAnimals();
    getUsers();
  }, []);

  const MenuSelect = Object.freeze({
    Dashboard: "Overview",
    Gallery: "Animal Gallery",
    Adoption: "New Virtual Adoptions",
    Pending: "Pending Adoptees",
    Settings: "Settings",
    Form: "Adding New Animal",
  });

  const now = new Date();
  const dateAndTime = now.toLocaleString().replaceAll(",", " | ");

  const [selection, setSelection] = useState(MenuSelect.Dashboard);

  const selectionChangeExternal = (externalValue) => {
    setSelection(externalValue);
  };

  const DashboardComponent = () => <DashboardMain _animals={animals} />;
  const GalleryComponent = () => (
    <AnimalList
      _animals={animals}
      _animalInfo={["createdAt", "adopter", "updatedAt", "actions"]}
      _headers={[
        "Animal Information",
        "Date Added",
        "Adopter",
        "Date Adopted",
        "Actions",
      ]}
    />
  );
  const AdoptionComponent = () => (
    <AnimalList
      _animals={animals.filter(
        (animal) => animal.adoptionAvailability === false,
      )}
      _animalInfo={["createdAt", "adopter", "updatedAt"]}
      _headers={["Animal Information", "Date Added", "Adopter", "Date Adopted"]}
    />
  );
  const PendingComponent = () => (
    <AnimalList
      _animals={animals.filter(
        (animal) => animal.adoptionAvailability === true,
      )}
      _animalInfo={["createdAt", "actions"]}
      _headers={["Animal Information", "Date Added", "Actions"]}
    />
  );
  const SettingsComponent = () => <UserList _users={users} />;

  const renderView = {
    [MenuSelect.Dashboard]: <DashboardComponent />,
    [MenuSelect.Gallery]: <GalleryComponent />,
    [MenuSelect.Adoption]: <AdoptionComponent />,
    [MenuSelect.Pending]: <PendingComponent />,
    [MenuSelect.Settings]: <SettingsComponent />,
    [MenuSelect.Form]: (
      <AnimalAddFrom onVariableChange={selectionChangeExternal} />
    ),
  };

  return (
    <>
      {!user || user == null || user.role != "admin" ? (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <h1 className="text-center">Your are not authorized to enter. Please return to the homepage.</h1>
        </div>
      ) : (
        <Container fluid>
          <Row>
            <Col
              id="menu-container"
              className="col-2 px-4 pt-4 pb-5 d-flex flex-column justify-content-start align-items-center vh-100"
            >
              <img
                id="claw-logo-dashboard"
                src={clawLogo}
                className="w-75"
                alt="The Claw Logo."
                onClick={() => {
                  navigate("/");
                }}
              ></img>
              <Nav className="flex-column mt-5 gap-3 w-100">
                <Nav.Link
                  as="button"
                  className={`py-3 d-flex flex-row align-items-center menu-option ${selection === MenuSelect.Dashboard ? "active justify-content-center w-100 mx-auto" : ""}`}
                  onClick={() => setSelection(MenuSelect.Dashboard)}
                >
                  <Col xs="auto" className="me-3">
                    <SquaresIcon className="dashboard-icons" />
                  </Col>
                  <Col xs="auto" className="menu-text">
                    Dashboard
                  </Col>
                </Nav.Link>

                <Nav.Link
                  as="button"
                  className={`py-3 d-flex flex-row align-items-center menu-option ${selection === MenuSelect.Gallery ? "active justify-content-center w-100 mx-auto" : ""}`}
                  onClick={() => setSelection(MenuSelect.Gallery)}
                >
                  <Col xs="auto" className="me-3">
                    <DogLogIcon className="dashboard-icons" />
                  </Col>
                  <Col xs="auto" className="menu-text">
                    Animal Gallery
                  </Col>
                </Nav.Link>

                <Nav.Link
                  as="button"
                  className={`py-3 d-flex flex-row align-items-center menu-option ${selection === MenuSelect.Adoption ? "active justify-content-center w-100 mx-auto" : ""}`}
                  onClick={() => setSelection(MenuSelect.Adoption)}
                >
                  <Col xs="auto" className="me-3">
                    <HandAndPawIcon className="dashboard-icons" />
                  </Col>
                  <Col xs="auto" className="menu-text">
                    Virtual Adoptions
                  </Col>
                </Nav.Link>

                <Nav.Link
                  as="button"
                  className={`py-3 d-flex flex-row align-items-center menu-option ${selection === MenuSelect.Pending ? "active justify-content-center w-100 mx-auto" : ""}`}
                  onClick={() => setSelection(MenuSelect.Pending)}
                >
                  <Col xs="auto" className="me-3">
                    <BufferIcon className="dashboard-icons" />
                  </Col>
                  <Col xs="auto" className="menu-text">
                    Pending Adoptions
                  </Col>
                </Nav.Link>

                <Nav.Link
                  as="button"
                  className={`py-3 d-flex flex-row align-items-center menu-option ${selection === MenuSelect.Settings ? "active justify-content-center w-100 mx-auto" : ""}`}
                  onClick={() => setSelection(MenuSelect.Settings)}
                >
                  <Col xs="auto" className="me-3">
                    <GearIcon className="dashboard-icons" />
                  </Col>
                  <Col xs="auto" className="menu-text">
                    Settings
                  </Col>
                </Nav.Link>
              </Nav>

              <Nav className="flex-column mt-auto w-100">
                <Nav.Link
                  as="button"
                  id="dashboard-logout-link"
                  className="py-3 d-flex flex-row align-items-center menu-option"
                  onClick={LoggingOut}
                >
                  <Col xs="auto" className="me-3">
                    <ExitIcon className="dashboard-icons" />
                  </Col>
                  <Col xs="auto" className="menu-text">
                    Log Out
                  </Col>
                </Nav.Link>
              </Nav>
            </Col>

            <Col
              id="content-container"
              className="col-10 offset-2 justify-self-start px-5"
            >
              <Row id="dashboard-header" className="mt-4 align-items-center">
                <Col>
                  <Row
                    className="var-font"
                    style={{
                      "--font": "var(--inter)",
                      "--font-size": "var(--fs-24px)",
                      "--font-weight": "700",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "var(--blue)",
                        }}
                      >
                        Welcome {user.name} {user.surname}
                      </span>
                      {" - "}
                      {selection}
                    </div>
                  </Row>
                  <Row
                    className="ps-3 var-font"
                    style={{
                      "--font": "var(--inter)",
                      "--font-size": "16px",
                      "--font-weight": "400",
                    }}
                  >
                    {dateAndTime}
                  </Row>
                </Col>
                <Col className="col-3 d-flex flex-column align-items-end">
                  {selection !== MenuSelect.Form ? (
                    <Button
                      id="add-animal-button"
                      className="button-primary"
                      onClick={() => setSelection(MenuSelect.Form)}
                    >
                      Add an Animal
                    </Button>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>

              <Row className="mt-4">
                {renderView[selection] || <DashboardComponent />}
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Dashboard;
