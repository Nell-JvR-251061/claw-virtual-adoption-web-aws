import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Spinner } from "react-bootstrap";

import NavBar from "./components/NavBar";
import AnimalCard from "./components/AnimalCard";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/AuthManager";
import SEO from "./components/SEO";

import "./App.css";
import "./styling/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AnimalGallery from "./pages/AnimalGallery";
import VirtualAdoption from "./pages/VirtualAdoption";
import AnimalProfile from "./pages/AnimalProfile";

import geoIcon from "./assets/geoIcon.webp";
import emailIcon from "./assets/emailIcon.webp";
import globalIcon from "./assets/globalIcon.webp";

const Home = () => {
  const navigate = useNavigate();

const API = "https://claw-api-cl.duckdns.org/api";

  const [animals, setAnimals] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalError, setModalError] = useState(false);

  const DisplayModal = (_title, _body, _isError) => {
    setModalTitle(_title);
    setModalBody(_body);
    setModalError(_isError);

    handleShow();
  };

  useEffect(() => {
    const getAnimals = async () => {
      try {
        const response = await fetch(API + "/dog");
        const data = await response.json();

        //console.log(data);

        setAnimals(data);
      } catch (error) {
        console.error("The backend has ran away...", error);
      }
    };

    getAnimals();
  }, []);

  useEffect(() => {
    const firstTime = sessionStorage.getItem("firstTime") !== null;
    if (!firstTime) {
      DisplayModal(
        "DISCLAIMER",
        `This website was built as an academic assignment, as a "Proof of Concept" for the CLAW NGO in partnership with Open Window.\nSome information and/or features might be inaccurate, missing or incomplete.`,
        true,
      );
      sessionStorage.setItem("firstTime", false);
    }
  }, []);

  return (
    <>
      <SEO
        title="Adopt a Virtual Pet & Save a Life"
        description="Find your perfect furry companion today. Browse hundreds of lovable animals waiting for a virtual home at Claw Virtual Adoption."
        path="/"
      />

      <Modal
        id={modalError ? "modal-error" : undefined}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title style={{ fontWeight: "700" }}>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Okay</Button>
        </Modal.Footer>
      </Modal>

      <nav>
        <NavBar />
      </nav>

      <Container fluid className="m-0 mt-1">
        <Row>
          <Col className="px-5 col-5 d-flex flex-column justify-content-center">
            <Row className="w-100 d-flex flex-row align-items-center">
              <Col
                xs="auto"
                className="p-0 var-font"
                style={{
                  "--font": "var(--inter)",
                  "--font-size": "var(--fs-32px)",
                  "--font-weight": "700",
                  color: "var(--blue)",
                }}
              >
                Welcome to Claw
              </Col>
              <Col xs="auto">
                <div className="claw-icon-image"></div>
              </Col>
            </Row>
            <Row
              className="p-0 my-3 var-font"
              style={{
                "--font": "var(--inter)",
                "--font-size": "var(--fs-20px)",
                "--font-weight": "700",
              }}
            >
              Changing Lives One Paw at a Time
            </Row>
            <Row
              className="p-0 mt-3 mb-5 var-font"
              style={{
                "--font": "var(--open-sans)",
                "--font-size": "var(--fs-16px)",
                "--font-weight": "400",
              }}
            >
              Meet a furry friend. Learn their story. Become part of their
              journey.
              <br />
              <br />
              Virtually adopt a furry friend in need and help provide the care,
              love and support they deserve while they wait for their forever
              home.
            </Row>
            <Row className="mt-5">
              <Col className="p-0 d-flex justify-content-start">
                <Button
                  className="button-primary"
                  onClick={() => {
                    navigate("/AnimalGallery");
                  }}
                >
                  View More
                </Button>
              </Col>
              <Col className="p-0 d-flex justify-content-end">
                {/* <Button className="button-secondary">Donate Now</Button> */}
              </Col>
            </Row>
          </Col>
          <Col className="p-0">
            <div className="header-image"></div>
          </Col>
        </Row>
      </Container>

      <section className="post-header-section">
        <Container
          fluid
          id="about-us-container"
          className="py-5 m-0 d-flex flex-column align-items-center text-center"
        >
          <Row
            className="p-0 var-font"
            style={{
              "--font": "var(--open-sans)",
              "--font-size": "var(--fs-36px)",
              "--font-weight": "700",
              color: "#3A5B2D",
            }}
          >
            About Us
          </Row>
          <Row
            className="p-0 mt-4 var-font"
            style={{
              "--font": "var(--open-sans)",
              "--font-size": "var(--fs-24px)",
              "--font-weight": "700",
            }}
          >
            Rescue. Rehabilitate. Rehome. Repeat.
          </Row>
          <Row
            className="p-0 mt-4 var-font"
            style={{
              "--font": "var(--open-sans)",
              "--font-size": "var(--fs-16px)",
              "--font-weight": "400",
            }}
          >
            CLAW (Community Led Animal Welfare) is a non-profit organisation
            based in South Africa dedicated to improving the lives of dogs in
            need. From rescue missions and second chances to rehabilitation and
            rehoming, we are committed to giving every dog a second chance.
            <br />
            <br />
            Our Virtual Adoption programme allows you to support a specific dog
            from anywhere in the world. Your monthly contribution provides food,
            shelter, healthcare and love, helping us continue our mission and
            creating a brighter future for our furry friends.
            <br />
            <br />
            Together, we can create a world where every dog is safe, healthy and
            loved.
          </Row>
          <Row
            className="p-0 mt-4 var-font"
            style={{
              "--font": "var(--open-sans)",
              "--font-size": "var(--fs-16px)",
              "--font-weight": "700",
            }}
          >
            Thank you for being part of the change.
          </Row>
        </Container>

        <Container fluid>
          <Row
            className="my-5 var-font d-flex flex-column align-items-center text-center "
            style={{
              "--font": "var(--inter)",
              "--font-size": "var(--fs-36px)",
              "--font-weight": "700",
              color: "var(--blue)",
            }}
          >
            Animals Up for Adoptions
          </Row>
          <Row>
            <div className="container mb-4">
              <div className="row justify-content-center g-3">
                {!animals ? (
                  <div className="w-100 d-flex justify-content-center">
                    <Spinner animation="border" className="spinner-color" />
                  </div>
                ) : animals.length === 0 ? (
                  <div className="w-100 d-flex justify-content-center">
                    <Spinner animation="border" className="spinner-color" />
                  </div>
                ) : (
                  [...animals]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map((animal) => (
                      <div className="col-12 col-md-4" key={animal._id}>
                        <AnimalCard _animal={animal} />
                      </div>
                    ))
                )}
              </div>
            </div>
          </Row>
          <Row className="my-5 col-3 mx-auto d-flex justify-content-center">
            <Button
              className="button-primary w-50"
              onClick={() => {
                navigate("/AnimalGallery");
              }}
            >
              View More
            </Button>
          </Row>
        </Container>

        <Container fluid className="pt-2 pb-5">
          <Row
            className="my-5 var-font d-flex flex-column align-items-center text-center "
            style={{
              "--font": "var(--inter)",
              "--font-size": "var(--fs-36px)",
              "--font-weight": "700",
              color: "var(--blue)",
            }}
          >
            Virtually Adopt an Animal
          </Row>
          <Row className=" px-5">
            <Col>
              <div id="virtual-adoption-image"></div>
            </Col>
            <Col className="ms-5">
              <Row
                className="my-4 var-font d-flex flex-column align-items-start"
                style={{
                  "--font": "var(--inter)",
                  "--font-size": "var(--fs-24px)",
                  "--font-weight": "700",
                }}
              >
                You don’t have to take them home to give them one.
              </Row>
              <Row
                className="my-5 var-font d-flex flex-column align-items-start"
                style={{
                  "--font": "var(--inter)",
                  "--font-size": "var(--fs-16px)",
                  "--font-weight": "400",
                }}
              >
                Learn more about what Virtual Adoption means for you and the dog
                you choose to support. And how that support assists us to keep
                looking after our furry friends.
              </Row>
              <Row className="py-3 col-6 d-flex justify-content-start">
                <Button
                  className="button-primary w-50"
                  onClick={() => {
                    navigate("/VirtualAdoption");
                  }}
                >
                  Learn More
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container fluid className="pt-5 pb-3 px-5">
          <Row className="d-flex justify-content-between">
            <Col className="col-3">
              <Row id="more-info-image"></Row>
              <Row
                className="mt-3 var-font d-flex flex-column align-items-start"
                style={{
                  "--font": "var(--open-sans)",
                  "--font-size": "var(--fs-16px)",
                  "--font-weight": "400",
                }}
              >
                We are dedicated to rescuing, rehabilitating and re-homing
                animals in need. Thank you for supporting our mission.
              </Row>
            </Col>

            <Col className="col-3">
              <Row
                className="var-font d-flex justify-content-center"
                style={{
                  "--font": "var(--inter)",
                  "--font-size": "var(--fs-16px)",
                  "--font-weight": "700",
                }}
              >
                Support
              </Row>
              <Row>
                <Col className="mt-3 d-flex align-items-center">
                  <a
                    href="https://clawsa.wixsite.com/claw/projects"
                    className="var-font blue-link"
                    style={{
                      "--font": "var(--inter)",
                      "--font-size": "var(--fs-16px)",
                      "--font-weight": "400",
                      color: "black",
                    }}
                  >
                    Projects
                  </a>
                </Col>
              </Row>
              <Row>
                <Col className="mt-3 d-flex align-items-center">
                  <a
                    href="https://clawsa.wixsite.com/claw/adopt"
                    className="var-font blue-link"
                    style={{
                      "--font": "var(--inter)",
                      "--font-size": "var(--fs-16px)",
                      "--font-weight": "400",
                      color: "black",
                    }}
                  >
                    Offline Adoption
                  </a>
                </Col>
              </Row>
              <Row>
                <Col className="mt-3 d-flex align-items-center">
                  <a
                    href="https://ee6feaac-1891-4a07-9689-3ecec25ab214.filesusr.com/ugd/c293f2_23c7e923de0a4da98a9fd8a050142af2.pdf"
                    className="var-font blue-link"
                    style={{
                      "--font": "var(--inter)",
                      "--font-size": "var(--fs-16px)",
                      "--font-weight": "400",
                      color: "black",
                    }}
                  >
                    Volunteer
                  </a>
                </Col>
              </Row>
              <Row>
                <Col className="mt-3 d-flex align-items-center">
                  <a
                    href="https://clawsa.wixsite.com/claw/donate"
                    className="var-font blue-link"
                    style={{
                      "--font": "var(--inter)",
                      "--font-size": "var(--fs-16px)",
                      "--font-weight": "400",
                      color: "black",
                    }}
                  >
                    Donate Now
                  </a>
                </Col>
              </Row>
            </Col>

            <Col className="col-4">
              <Row
                className="var-font d-flex justify-content-center"
                style={{
                  "--font": "var(--inter)",
                  "--font-size": "var(--fs-16px)",
                  "--font-weight": "700",
                }}
              >
                Contact Us
              </Row>
              <Row className="mt-2 d-flex ">
                <Col className="col-1 me-2 d-flex align-items-center">
                  <img
                    src={geoIcon}
                    className="icons"
                    style={{ height: "50%" }}
                    alt="Icon of a waypoint."
                  ></img>
                </Col>
                <Col className="d-flex align-items-center">
                  <div
                    className="var-font "
                    style={{
                      "--font": "var(--inter)",
                      "--font-size": "var(--fs-16px)",
                      "--font-weight": "400",
                    }}
                  >
                    Un-named Rd, Durban Deep, Roodepoort 237-Iq, Johannesburg,
                    1724
                  </div>
                </Col>
              </Row>

              <Row className="d-flex ">
                <Col className="col-1 me-2 d-flex align-items-center">
                  <img
                    src={emailIcon}
                    className="icons"
                    style={{ height: "50%" }}
                    alt="Icon of a envelop."
                  ></img>
                </Col>
                <Col className="d-flex align-items-center">
                  <a
                    href="mailto:clawsouthafrica@gmail.com"
                    className="var-font blue-link"
                    style={{
                      "--font": "var(--inter)",
                      "--font-size": "var(--fs-16px)",
                      "--font-weight": "400",
                      color: "black",
                    }}
                  >
                    CLAWsouthafrica@gmail.com
                  </a>
                </Col>
              </Row>

              <Row className="d-flex ">
                <Col className="col-1 me-2 d-flex align-items-center">
                  <img
                    src={globalIcon}
                    className="icons"
                    style={{ height: "50%" }}
                    alt="Icon of the globe."
                  ></img>
                </Col>
                <Col className="d-flex align-items-center">
                  <a
                    href="https://clawsa.wixsite.com/claw"
                    className="var-font blue-link"
                    style={{
                      "--font": "var(--inter)",
                      "--font-size": "var(--fs-16px)",
                      "--font-weight": "400",
                      color: "black",
                    }}
                  >
                    clawsa.com
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AnimalGallery" element={<AnimalGallery />} />
            <Route path="/AnimalProfile" element={<AnimalProfile />} />
            <Route path="/VirtualAdoption" element={<VirtualAdoption />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
