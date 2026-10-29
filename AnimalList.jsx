import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Button, Spinner } from "react-bootstrap";

import "../../styling/AnimalList.css";

function AnimalList({
  _animals = [],
  _animalInfo = [],
  _title = "",
  _linkToURL = "",
  _linkToText = "View more >",
  _headers = ["Animal Information", "Date Arrived", "Status", "Actions"],
}) {
  const API = "https://claw-virtual-adoption-web-production.up.railway.app/api";

  const navigate = useNavigate();

  const DeleteAnimal = async (animalId) => {
    //function to delete selected dog
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`${API}/dog/delete/${animalId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      window.location.reload();
    } catch (error) {
      console.error("Error deleting dog:", error);
    }
  };

  const [currentAnimalGroup, setCurrentAnimalGroup] = useState(0);

  const animalGroups = [];

  for (let i = 0; i < _animals.length; i += 8) {
    animalGroups.push(_animals.slice(i, i + 8));
  }
  const animalList = animalGroups[currentAnimalGroup] ?? [];

  const nextGroup = () => {
    setCurrentAnimalGroup((prev) =>
      Math.min(prev + 1, animalGroups.length - 1),
    );
  };

  const previousGroup = () => {
    setCurrentAnimalGroup((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <ListGroup id="animal-list-group">
        {_title !== "" && (
          <ListGroup.Item className="title-item px-4 pt-3 pb-1">
            {_linkToURL !== "" ? (
              <Row>
                <Col className="list-title">{_title}</Col>
                <Col className="list-link d-flex align-items-center justify-content-end">
                  <a href={_linkToURL}>{_linkToText}</a>
                </Col>
              </Row>
            ) : (
              <span className="list-title">{_title}</span>
            )}
          </ListGroup.Item>
        )}

        <ListGroup.Item className="list-headers">
          <Row className="text-center">
            {_headers.map((header, index) => (
              <Col key={index}>{header}</Col>
            ))}
          </Row>
        </ListGroup.Item>

        {animalList.length > 0 ? (
          animalList.map((animal, index) => (
            <ListGroup.Item
              as="button"
              className="list-animal"
              key={animal._id ?? index}
              onClick={() =>
                navigate("/AnimalProfile", {
                  state: { animalId: animal._id },
                })
              }
            >
              <Row className="d-flex align-items-center">
                <Col>
                  <Row className="d-flex align-items-center">
                    <Col xs="auto">
                      <img
                        className="list-images"
                        src={animal.image}
                        alt={`An image of a ${animal.breed} named ${animal.name}`}
                      />
                    </Col>

                    <Col className="ps-4">
                      <Row className="animal-name">{animal.name}</Row>
                      <Row className="animal-breed">{animal.breed}</Row>
                    </Col>
                  </Row>
                </Col>

                {_animalInfo.map((info, infoIndex) => {
                  let value = animal[info];

                  // Fixes ISO timestamps into regular date and time
                  if (
                    typeof value === "string" &&
                    value.includes("T") &&
                    value.endsWith("Z")
                  ) {
                    value = value.replace("T", " | ").slice(0, 18);
                  } else if (value !== null && typeof value === "object") {
                    value = JSON.stringify(value);
                  }

                  return (
                    <Col key={infoIndex} className="text-center info-text">
                      {info === "actions" &&
                      animal.adoptionAvailability != false ? (
                        <a
                          className="red-link"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            DeleteAnimal(animal._id);
                          }}
                        >
                          Remove
                        </a>
                      ) : (
                        value
                      )}
                    </Col>
                  );
                })}
              </Row>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-center">
            <Spinner animation="border" variant="primary" />
          </ListGroup.Item>
        )}

        {animalGroups.length > 1 && ( //if more then 8 are received, creates groups
          <ListGroup.Item>
            <Row className="align-items-center">
              <Col>
                <Button
                  id="group-back-button"
                  onClick={previousGroup}
                  disabled={currentAnimalGroup === 0}
                >
                  Back
                </Button>
              </Col>

              <Col className="text-center">
                <span id="group-number-text">
                  Group {currentAnimalGroup + 1} of {animalGroups.length}
                </span>
              </Col>

              <Col className="text-end">
                <Button
                  id="group-next-button"
                  onClick={nextGroup}
                  disabled={currentAnimalGroup === animalGroups.length - 1}
                >
                  Next
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
}

export default AnimalList;
