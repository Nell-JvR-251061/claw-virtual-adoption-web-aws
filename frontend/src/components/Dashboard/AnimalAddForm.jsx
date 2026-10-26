import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";

import "../../styling/AnimalAddForm.css";

function AnimalAddFrom({ onVariableChange }) {
  //---------- Server and Navigation References----------
  const API = "http://13.61.104.220";
  const navigate = useNavigate();

  //---------- Bootstrap Modal Code ----------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalError, setModalError] = useState(false);

  //---------- Variables ----------
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("Other");
  const [size, setSize] = useState("Medium");
  const [energy, setEnergy] = useState("Moderate");
  const [goodWith, setGoodWith] = useState([]);
  const [badWith, setBadWith] = useState([]);
  const [location, setLocation] = useState("");
  const [personality, setPersonality] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");

  //---------- Functions ----------
  const ClearInputs = () => {
    setName("");
    setGender("");
    setAge("");
    setBreed("");
    setSize("");
    setEnergy("");
    setGoodWith([]);
    setBadWith("");
    setLocation("");
    setPersonality("");
    setAbout("");
    setImage("");

    setModalTitle("");
    setModalBody("");
    setModalError(false);
  };

  //Shows modal with custom information
  const DisplayModal = (_title, _body, _isError) => {
    setModalTitle(_title);
    setModalBody(_body);
    setModalError(_isError);

    handleShow();
  };

  const GoodWithChange = (e) => {
    const { name, checked } = e.target;

    setGoodWith((prevSelected) => {
      if (checked) {
        return [...prevSelected, name];
      } else {
        return prevSelected.filter((item) => item !== name);
      }
    });
  };

  const BadWithChange = (e) => {
    const { name, checked } = e.target;

    setBadWith((prevSelected) => {
      if (checked) {
        return [...prevSelected, name];
      } else {
        return prevSelected.filter((item) => item !== name);
      }
    });
  };

  const RegisterSubmit = async (sub) => {
    sub.preventDefault();

    if (
      [
        name,
        gender,
        age,
        breed,
        size,
        energy,
        location,
        personality,
        about,
        image,
      ].some((val) => !val)
    ) {
      DisplayModal(
        "Missing information!",
        "Please fill in all fields to proceed.",
        false,
      );
      return;
    }

    if (isNaN(age) || Number(age) < 0) {
      DisplayModal(
        "Missing information!",
        "Please enter a valid age value.",
        true,
      );
      return;
    }

    const conflicts = goodWith.filter((item) => badWith.includes(item));

    if (conflicts.length > 0) {
      DisplayModal(
        "Conflicting selections!",
        `The following values cannot appear in both the Good with & Bad with options: ${conflicts.join(", ")}.`,
        true,
      );
      return;
    }


    try {
      const res = await fetch(API + "/dog" + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          gender: gender,
          age: age,
          breed: breed,
          size: size,
          personality: personality,
          energy: energy,
          goodWith: goodWith,
          badWith: badWith,
          location: location,
          about: about,
          image: image,
        }),
      });

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message);
      }

      const saved = await res.json();

      ClearInputs();

      onVariableChange("Overview");
    } catch (e) {
      //console.log({ msg: e.message, type: "error" });
      DisplayModal("Error!", e.message, true);
      return;
    }
  };

  return (
    <>
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

      <Form id="animal-add-form" className="p-4 mb-4" onSubmit={RegisterSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the animal's name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter animal's age"
            />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridBreed">
            <Form.Label>Breed</Form.Label>
            <Form.Select
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            >
              <option>Affenpinscher</option>
              <option>Afghan Hound</option>
              <option>Airedale Terrier</option>
              <option>Akita</option>
              <option>Alaskan Malamute</option>
              <option>American Staffordshire Terrier</option>
              <option>Anatolian Shepherd</option>
              <option>Australian Cattle Dog</option>
              <option>Australian Shepherd</option>
              <option>Basenji</option>
              <option>Basset Hound</option>
              <option>Beagle</option>
              <option>Beardie</option>
              <option>Belgian Malinois</option>
              <option>Bernese Mountain Dog</option>
              <option>Bichon Frise</option>
              <option>Bloodhound</option>
              <option>Boerboel</option>
              <option>Bolognese</option>
              <option>Border Collie</option>
              <option>Borzoi</option>
              <option>Boston Terrier</option>
              <option>Boxer</option>
              <option>Brittany</option>
              <option>Brussels Griffon</option>
              <option>Bull Terrier</option>
              <option>Bulldog</option>
              <option>Bullmastiff</option>
              <option>Cairn Terrier</option>
              <option>Cane Corso</option>
              <option>Cardigan Welsh Corgi</option>
              <option>Cavalier King Charles Spaniel</option>
              <option>Chesapeake Bay Retriever</option>
              <option>Chihuahua</option>
              <option>Chinese Crested</option>
              <option>Chinese Shar-Pei</option>
              <option>Chow Chow</option>
              <option>Chug</option>
              <option>Cocker Spaniel</option>
              <option>Collie</option>
              <option>Dachshund</option>
              <option>Dalmatian</option>
              <option>Doberman Pinscher</option>
              <option>Dogue de Bordeaux</option>
              <option>English Cocker Spaniel</option>
              <option>English Setter</option>
              <option>English Springer Spaniel</option>
              <option>French Bulldog</option>
              <option>German Shepherd</option>
              <option>German Shorthaired Pointer</option>
              <option>Giant Schnauzer</option>
              <option>Golden Retriever</option>
              <option>Gordon Setter</option>
              <option>Great Dane</option>
              <option>Great Pyrenees</option>
              <option>Greyhound</option>
              <option>Havanese</option>
              <option>Irish Setter</option>
              <option>Irish Wolfhound</option>
              <option>Italian Greyhound</option>
              <option>Jack Russell Terrier</option>
              <option>Japanese Chin</option>
              <option>Labradoodle</option>
              <option>Labrador Retriever</option>
              <option>Lhasa Apso</option>
              <option>Maltese</option>
              <option>Mastiff</option>
              <option>Miniature Pinscher</option>
              <option>Miniature Schnauzer</option>
              <option>Newfoundland</option>
              <option>Old English Sheepdog</option>
              <option>Papillon</option>
              <option>Pekingese</option>
              <option>Pembroke Welsh Corgi</option>
              <option>Pointer</option>
              <option>Pomeranian</option>
              <option>Poodle</option>
              <option>Portuguese Water Dog</option>
              <option>Pug</option>
              <option>Rhodesian Ridgeback</option>
              <option>Rottweiler</option>
              <option>Saint Bernard</option>
              <option>Samoyed</option>
              <option>Schipperke</option>
              <option>Scottish Terrier</option>
              <option>Shetland Sheepdog</option>
              <option>Shiba Inu</option>
              <option>Shih Tzu</option>
              <option>Siberian Husky</option>
              <option>Silky Terrier</option>
              <option>Staffordshire Bull Terrier</option>
              <option>Standard Schnauzer</option>
              <option>Tibetan Mastiff</option>
              <option>Tibetan Terrier</option>
              <option>Toy Poodle</option>
              <option>Vizsla</option>
              <option>Weimaraner</option>
              <option>Welsh Terrier</option>
              <option>West Highland White Terrier</option>
              <option>Whippet</option>
              <option>Yorkshire Terrier</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSize">
            <Form.Label>Size</Form.Label>
            <Form.Select value={size} onChange={(e) => setSize(e.target.value)}>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>Extra Large</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEnergy">
            <Form.Label>Energy</Form.Label>
            <Form.Select
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
            >
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Label className="fw-bold">Good With:</Form.Label>
          <Form.Group
            className="d-flex flex-row justify-content-between"
            controlId="formGridGoodWith"
          >
            <Form.Check
              inline
              label="Other Dogs"
              name="Other Dogs"
              checked={goodWith.includes("Other Dogs")}
              onChange={GoodWithChange}
            />
            <Form.Check
              inline
              label="Other Pets"
              name="Other Pets"
              checked={goodWith.includes("Other Pets")}
              onChange={GoodWithChange}
            />
            <Form.Check
              inline
              label="Strangers"
              name="Strangers"
              checked={goodWith.includes("Strangers")}
              onChange={GoodWithChange}
            />
            <Form.Check
              inline
              label="Children"
              name="Children"
              checked={goodWith.includes("Children")}
              onChange={GoodWithChange}
            />
            <Form.Check
              inline
              label="Loud Sounds"
              name="Loud Sounds"
              checked={goodWith.includes("Loud Sounds")}
              onChange={GoodWithChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Label className="fw-bold">Difficult With:</Form.Label>
          <Form.Group
            className="d-flex flex-row justify-content-between"
            controlId="formGridBadWith"
          >
            <Form.Check
              inline
              label="Other Dogs"
              name="Other Dogs"
              checked={badWith.includes("Other Dogs")}
              onChange={BadWithChange}
            />
            <Form.Check
              inline
              label="Other Pets"
              name="Other Pets"
              checked={badWith.includes("Other Pets")}
              onChange={BadWithChange}
            />
            <Form.Check
              inline
              label="Strangers"
              name="Strangers"
              checked={badWith.includes("Strangers")}
              onChange={BadWithChange}
            />
            <Form.Check
              inline
              label="Children"
              name="Children"
              checked={badWith.includes("Children")}
              onChange={BadWithChange}
            />
            <Form.Check
              inline
              label="Loud Sounds"
              name="Loud Sounds"
              checked={badWith.includes("Loud Sounds")}
              onChange={BadWithChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group controlId="formGridLocation">
            <Form.Label>Located</Form.Label>
            <Form.Control
              as="textarea"
              maxlength="250"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are they currently living?"
              style={{ height: "3.2lh", "max-height": "3.2lh" }}
            />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group controlId="formGridPersonality">
            <Form.Label>Personality</Form.Label>
            <Form.Control
              as="textarea"
              maxlength="500"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              placeholder="What are they like?"
              style={{ height: "5.2lh", "max-height": "5.2lh" }}
            />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group controlId="formGridAbout">
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              maxlength="500"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell us about their story"
              style={{ height: "5.2lh", "max-height": "5.2lh" }}
            />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group controlId="formGridImage">
            <Form.Label>Photo URL</Form.Label>
            <Form.Control
              as="textarea"
              maxlength="250"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Paste a URL of a photo of them"
              style={{ height: "2.2lh", "max-height": "2.2lh" }}
            />
          </Form.Group>
        </Row>

        <Row className="pt-4 pb-2 justify-content-end px-3">
          <Button type="submit" className="button-primary w-25">
            Add Animal
          </Button>
        </Row>
      </Form>
    </>
  );
}

export default AnimalAddFrom;
