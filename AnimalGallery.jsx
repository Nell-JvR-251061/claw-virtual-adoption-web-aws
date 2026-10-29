import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AnimalCard from "../components/AnimalCard";
import SEO from "../components/SEO";

import "../styling/AnimalGallery.css";

function AnimalGallery() {
  const API = "https://claw-virtual-adoption-web-production.up.railway.app/api";

  const [animals, setAnimals] = useState([]);

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

  return (
    <>
      <SEO
        title="Browse Virtual Adoptable Pets"
        description="Meet our virtual adoptable animals. Browse through our current selection of dogs to add one to your family."
        path="/AnimalGallery"
      />

      <nav>
        <NavBar />
      </nav>

      <Container fluid className="m-0">
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
                They're Waiting For You
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
              You don’t have to take them home to give them one
            </Row>
            <Row
              className="p-0 mt-3 mb-5 var-font"
              style={{
                "--font": "var(--open-sans)",
                "--font-size": "var(--fs-16px)",
                "--font-weight": "400",
              }}
            >
              Meet a furry friend currently in CLAW’s care. Choose a furry
              friend whose story speaks to you and become part of their journey.
            </Row>
          </Col>
          <Col className="p-0">
            <div id="animal-gallery-header-image"></div>
          </Col>
        </Row>
      </Container>

      <div id="dog-gallery-container" className="py-5">
        {!animals ? (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" className="spinner-color" />
          </div>
        ) : (
          <Container>
            {animals.filter((animal) => animal.adoptionAvailability === true)
              .length === 0 ? (
              <div className="w-100 d-flex justify-content-center">
                <Spinner animation="border" className="spinner-color" />
              </div>
            ) : (
              <Row>
                {animals
                  .filter((animal) => animal.adoptionAvailability === true)
                  .map((animal) => (
                    <Col
                      key={animal._id}
                      sm={12}
                      md={6}
                      lg={4}
                      className="mb-5"
                    >
                      <AnimalCard _animal={animal} />
                    </Col>
                  ))}
              </Row>
            )}
          </Container>
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default AnimalGallery;
