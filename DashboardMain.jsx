import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import AnimalList from "./AnimalList";

import "../../styling/DashboardMain.css";

function DashboardMain({ _animals }) {
  const [newVirtualAdoptionList, setNewVirtualAdoptionList] = useState([]);
  const [pendingAdoptionsList, setPendingAdoptionsList] = useState([]);

  useEffect(() => {
    setNewVirtualAdoptionList(
      _animals
        .filter((animal) => animal.adoptionAvailability === false)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3),
    );

    setPendingAdoptionsList(
      _animals
        .filter((animal) => animal.adoptionAvailability === true)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3),
    );
  }, [_animals]);

  return (
    <div id="main-container">
      <Row className="d-flex justify-content-between p-0 m-0">
        <Col className="quick-facts d-flex flex-column justify-content-center">
          <Row className="quick-facts-header justify-content-center">
            Total Animals
          </Row>
          <Row className="quick-facts-body justify-content-center">
            {_animals.length}
          </Row>
        </Col>

        <Col className="quick-facts d-flex flex-column justify-content-center">
          <Row className="quick-facts-header justify-content-center">
            Adoptions
          </Row>
          <Row className="quick-facts-body justify-content-center">
            {
              _animals.filter((animal) => animal.adoptionAvailability === false)
                .length
            }
          </Row>
        </Col>

        <Col className="quick-facts d-flex flex-column justify-content-center">
          <Row className="quick-facts-header justify-content-center">
            Pending Adoptions
          </Row>
          <Row className="quick-facts-body justify-content-center">
            {
              _animals.filter((animal) => animal.adoptionAvailability === true)
                .length
            }
          </Row>
        </Col>
      </Row>

      <div className="p-0 mt-4">
        <AnimalList
          _animals={newVirtualAdoptionList}
          _animalInfo={["adopter", "adopterEmail", "updatedAt"]}
          _title="New Virtual Adoptions"
          _headers={[
            "Animal Information",
            "Adopter",
            "Adopter Email",
            "Date Adopted",
          ]}
        />
      </div>

      <div className="p-0">
        <AnimalList
          _animals={pendingAdoptionsList}
          _animalInfo={["createdAt"]}
          _title="Pending Adoptions"
          _headers={["Animal Information", "Date Added"]}
        />
      </div>
    </div>
  );
}

export default DashboardMain;
