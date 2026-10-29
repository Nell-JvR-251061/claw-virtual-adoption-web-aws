import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button, Modal, Spinner } from "react-bootstrap";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

import "../styling/AnimalProfile.css";

function AnimalProfile() {
const API = "https://claw-api-cl.duckdns.org/api";

  //---------- Bootstrap Modal Code ----------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalError, setModalError] = useState(false);

  const location = useLocation();
  const animalId = location.state?.animalId;

  const [animal, setAnimal] = useState({});
  const [isAdopted, setIsAdopted] = useState(false);

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user") || "{}"),
  );
  const [isAdoptedByUser, setIsAdoptedByUser] = useState(
    user.animals?.includes(animalId) ?? false,
  );

  const petName = animal?.name || "Adoptable Pet";
  const petType = animal?.breed || "Rescue Animal";

  useEffect(() => {
    const getAnimal = async () => {
      if (!animalId) return;

      try {
        const response = await fetch(`${API}/dog/get/${animalId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch animal details");
        }

        const data = await response.json();

        setAnimal(data);
        setIsAdopted(data.adoptionAvailability);

        setIsAdoptedByUser(
          data.adopterEmail === user.email ||
            (user.animals?.includes(animalId) ?? false),
        );
      } catch (error) {
        console.error("Failed to fetch animal:", error);
      }
    };

    getAnimal();
  }, [animalId, API, user.email, user.animals]);

  //Shows modal with custom information
  const DisplayModal = (_title, _body, _isError) => {
    setModalTitle(_title);
    setModalBody(_body);
    setModalError(_isError);

    handleShow();
  };

  const CheckIfAdoptable = async () => {
    if (!user?.id) {
      DisplayModal(
        "One Moment!",
        `You'll need to signup / login to adopt ${animal.name}.`,
        true,
      );
      return;
    }

    if ((user.animals?.length ?? 0) > 0) {
      DisplayModal(
        "Sorry!",
        `You either have adopted an animal already OR it has not been six months since your last adoption.`,
        true,
      );
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const updatedAnimals = [...(user.animals || []), animalId];

      const res = await fetch(API + "/auth/update/" + user.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          adoptedAnimals: updatedAnimals,
        }),
      });

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message);
      }

      try {
        const res = await fetch(API + "/dog/update/" + animalId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            adoptionAvailability: false,
            adopter: user.name + " " + user.surname,
            adopterEmail: user.email,
          }),
        });

        if (!res.ok) {
          const e = await res.json();
          throw new Error(e.message);
        }

        const data = await res.json();

        setAnimal(data);
        setIsAdopted(data.adoptionAvailability);
      } catch (e) {
        //console.log({ msg: e.message, type: "error" });
        DisplayModal("Error!", e.message, true);
      }

      DisplayModal(
        `${animal.name} has found a home!`,
        `Thank you ${user.name} for choosing to support ${animal.name}!`,
        false,
      );

      const storedUser = JSON.parse(sessionStorage.getItem("user"));

      storedUser.animals = updatedAnimals;

      sessionStorage.setItem("user", JSON.stringify(storedUser));
    } catch (e) {
      //console.log({ msg: e.message, type: "error" });
      DisplayModal("Error!", e.message, true);
    }
  };

  return (
    <>
      <SEO
        title={`Adopt ${petName} (${petType})`}
        description={`Meet ${petName}, a sweet ${petType} looking for a loving supporter. Read their personality profile, view photos, and apply to adopt today.`}
        path={`/AnimalProfile/${animal?.id || ""}`}
        image={animal?.imageUrl}
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

      <div id="animal-profile" className="d-flex flex-column min-vh-100">
        <nav>
          <NavBar />
        </nav>

        <Container
          fluid
          id="profile-container"
          className=""
          style={{ "font-family": "var(--inter)" }}
        >
          {!animal.image ? (
            <div className="w-100 d-flex justify-content-center">
              <Spinner animation="border" className="spinner-color" />
            </div>
          ) : (
            <Row className="m-0">
              <Col className="col-3 p-0">
                <Row className="m-0 mb-3">
                  <h1
                    className="m-0 p-0"
                    style={{ "font-weight": "700", "text-align": "center" }}
                  >
                    {animal.name}
                  </h1>
                </Row>
                <Row className="m-0 mb-3" id="animal-profile-image-container">
                  <img
                    className="p-0"
                    id="animal-profile-image"
                    src={animal.image}
                    alt={`An image of a ${animal.breed} named ${animal.name}`}
                    onError={(e) => {
                      console.error(
                        "Failed to load image:",
                        e.currentTarget.src,
                      );
                    }}
                  />
                </Row>
                <Row className="m-0">
                  <Col className="p-0">
                    <h3
                      className="profile-quick-info"
                      style={{ "text-align": "center" }}
                    >
                      Status:{" "}
                      {animal.adoptionAvailability ? (
                        <span style={{ color: "var(--blue)" }}>Available</span>
                      ) : isAdoptedByUser ? (
                        <span style={{ color: "var(--blue)" }}>Yours</span>
                      ) : (
                        <span style={{ color: "red" }}>Unavailable</span>
                      )}
                    </h3>
                  </Col>
                </Row>
              </Col>

              <Col className="d-flex flex-column justify-content-center px-5">
                <Row className="m-0">
                  <Col className="p-0">
                    <h5 style={{ "font-weight": "700", color: "var(--blue)" }}>
                      {animal.name}'s Story
                    </h5>
                  </Col>
                </Row>
                <Row className="m-0">
                  <Col className="p-0">
                    <p style={{ "font-weight": "400" }}>{animal.about}</p>
                  </Col>
                </Row>

                <Row className="m-0">
                  <Col className="p-0">
                    <h5 style={{ "font-weight": "700", color: "var(--blue)" }}>
                      Personality
                    </h5>
                  </Col>
                </Row>
                <Row className="m-0">
                  <Col className="p-0">
                    <p style={{ "font-weight": "400" }}>{animal.personality}</p>
                  </Col>
                </Row>

                <Row className="m-0">
                  <Col className="p-0">
                    <h5 style={{ "font-weight": "700", color: "var(--blue)" }}>
                      Information about {animal.name}
                    </h5>
                  </Col>
                </Row>
                <Row className="m-0">
                  <Col className="p-0">
                    <Row className="m-0 mb-2">
                      <Col className="p-0">
                        <h5 style={{ "font-weight": "400" }}>
                          <span
                            style={{ "font-weight": "700", color: "black:" }}
                          >
                            Age:
                          </span>{" "}
                          {animal.age}
                        </h5>
                      </Col>
                    </Row>

                    <Row className="m-0 mb-2">
                      <Col className="p-0">
                        <h5 style={{ "font-weight": "400" }}>
                          <span
                            style={{ "font-weight": "700", color: "black:" }}
                          >
                            Gender:
                          </span>{" "}
                          {animal.gender}
                        </h5>
                      </Col>
                    </Row>

                    <Row className="m-0 mb-2">
                      <Col className="p-0">
                        <h5 style={{ "font-weight": "400" }}>
                          <span
                            style={{ "font-weight": "700", color: "black:" }}
                          >
                            Breed:
                          </span>{" "}
                          {animal.breed}
                        </h5>
                      </Col>
                    </Row>
                  </Col>

                  <Col className="p-0">
                    <Row className="m-0 mb-2">
                      <Col className="p-0">
                        <h5 style={{ "font-weight": "400" }}>
                          <span
                            style={{ "font-weight": "700", color: "black:" }}
                          >
                            Size:
                          </span>{" "}
                          {animal.size}
                        </h5>
                      </Col>
                    </Row>
                    <Row className="m-0 mb-2">
                      <Col className="p-0">
                        <h5 style={{ "font-weight": "400" }}>
                          <span
                            style={{ "font-weight": "700", color: "black:" }}
                          >
                            Energy:
                          </span>{" "}
                          {animal.energy}
                        </h5>
                      </Col>
                    </Row>
                    <Row className="m-0 mb-2">
                      <Col className="p-0">
                        <h5 style={{ "font-weight": "400" }}>
                          <span
                            style={{ "font-weight": "700", color: "black:" }}
                          >
                            Located:
                          </span>{" "}
                          {animal.location}
                        </h5>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="m-0 mb-2">
                  <Col className="p-0">
                    <h5 style={{ "font-weight": "400" }}>
                      <span style={{ "font-weight": "700", color: "black:" }}>
                        Good With:
                      </span>{" "}
                      {animal.goodWith && animal.goodWith.join(" | ")}
                    </h5>
                  </Col>
                </Row>

                <Row className="m-0 mb-2">
                  <Col className="p-0">
                    <h5 style={{ "font-weight": "400" }}>
                      <span style={{ "font-weight": "700", color: "black:" }}>
                        Difficulty With:
                      </span>{" "}
                      {animal.badWith && animal.badWith.join(" | ")}
                    </h5>
                  </Col>
                </Row>

                {isAdopted ? (
                  <Row className="d-flex justify-content-end">
                    <Button
                      className="button-primary w-25"
                      onClick={CheckIfAdoptable}
                    >
                      Adopt {animal.name}
                    </Button>
                  </Row>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          )}
        </Container>

        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default AnimalProfile;
