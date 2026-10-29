import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";

import loginLeftImage from "../assets/girlHugDog.webp";
import pawIcon from "../assets/pawIcon.webp";
import clawLogo from "../assets/clawLogo.webp";

import { useAuth } from "../components/AuthManager";
import SEO from '../components/SEO';

import "bootstrap/dist/css/bootstrap.min.css";
import "../styling/Login.css";

function Login() {
  //---------- Server and Navigation References----------
const API = "https://claw-api-cl.duckdns.org/api";
  const navigate = useNavigate();
  const { Login } = useAuth();

  //---------- Bootstrap Modal Code ----------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalError, setModalError] = useState(false);

  //---------- Variables ----------
  const [isLogging, setLogging] = useState(true);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [reEmail, setReEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [nameEntered, setNameEntered] = useState("");
  const [emailEntered, setEmailEntered] = useState("");
  const [passwordEntered, setPasswordEntered] = useState("");

  //---------- Functions ----------
  const ClearInputs = () => {
    setName("");
    setSurname("");
    setEmail("");
    setReEmail("");
    setPassword("");
    setRePassword("");

    setNameEntered("");
    setEmailEntered("");
    setPasswordEntered("");

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

  //Swaps between Login and Sign up
  const ChangeForm = () => {
    ClearInputs();
    setLogging((previousState) => !previousState);
  };

  //Checks of information is correct and attempts to register a new user
  const RegisterSubmit = async (sub) => {
    sub.preventDefault();

    if (
      [name, surname, email, reEmail, password, rePassword].some((val) => !val)
    ) {
      DisplayModal(
        "Missing information!",
        "Please fill in all fields to proceed.",
        false,
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      DisplayModal("Incorrect Email!", "Please enter a valid email.", false);
      return;
    }

    if (email.toLowerCase() !== reEmail.toLowerCase()) {
      DisplayModal("Email mismatch!", "The provided emails don't match", false);
      return;
    }

    if (password.length < 6 || rePassword.length < 6) {
      DisplayModal(
        "Password error!",
        "User's password must be at least 6 characters long",
        false,
      );
      return;
    }

    if (password !== rePassword) {
      DisplayModal(
        "Password mismatch!",
        "The provided passwords don't match",
        false,
      );
      return;
    }

    try {
      const res = await fetch(API + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message);
      }

      const saved = await res.json();

      Login(
        {
          name: saved.name,
          role: saved.role,
          surname: saved.surname,
          email: saved.email,
          id: saved.id,
          animals: saved.animals ?? []
        },
        saved.token,
      );

      ClearInputs();

      if (saved.role == "admin") {
        navigate("/Dashboard");
      } else {
        navigate("/");
      }
    } catch (e) {
      //console.log({ msg: e.message, type: "error" });
      DisplayModal("Error!", e.message, true);
      return;
    }
  };

  const LoginSubmit = async (sub) => {
    sub.preventDefault();

    if (!nameEntered || !emailEntered || !passwordEntered) {
      DisplayModal(
        "Missing information!",
        "Please fill in all fields to proceed.",
        false,
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEntered)) {
      DisplayModal("Incorrect Email!", "Please enter a valid email.", false);
      return;
    }

    try {
      const res = await fetch(API + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameEntered,
          email: emailEntered,
          password: passwordEntered,
        }),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.message);
      }

      const data = await res.json();

      //console.log(data);

      Login(
        {
          name: data.name,
          role: data.role,
          surname: data.surname,
          email: data.email,
          id: data.id,
          animals: data.animals,
        },
        data.token,
      );

      ClearInputs();

      if (data.role == "admin") {
        navigate("/Dashboard");
      } else {
        navigate("/");
      }
    } catch (e) {
      //console.log({ msg: e.message, type: "error" });
      DisplayModal("Error!", e.message, true);
    }
  };

  return (
    <>
      <SEO title={isLogging ? "Login" : "Sign Up"} description={isLogging ? "Log into your Claw profile." : "Sign up for a Claw profile."} path="/Login" noIndex={true} />

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

      <Container fluid className="p-0">
        <Row className="m-0 vh-100">
          <Col sm={6} className="p-0 d-none d-md-block" id="login-left">
            <img
              className="h-100"
              id="login-left-image"
              alt="A smiling girl hugging a panting dog"
              src={loginLeftImage}
            ></img>
            <img
              id="claw-logo-login"
              alt="The Claw Logo"
              src={clawLogo}
              width="100px"
              height="auto"
            />
          </Col>

          <Col
            id="login-right"
            className="px-4 px-md-5 py-5 py-md-3 d-flex flex-column justify-content-center"
          >
            <Row className="m-0">
              <Col className="p-0">
                <Row
                  className="m-0 var-font"
                  style={{
                    "--font": "var(--inter)",
                    "--font-size": "var(--fs-36px)",
                    "--font-weight": "700",
                  }}
                >
                  Welcome to CLAW
                </Row>

                <Row className="m-0 align-items-center">
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
                    {isLogging ? <>Log In</> : <>Sign Up</>}
                  </Col>

                  <Col className="p-0">
                    <img
                      id="paw-icon"
                      src={pawIcon}
                      alt="A blue paw mark"
                    ></img>
                  </Col>
                </Row>

                <Row className="m-0 mt-3 mb-5">
                  {isLogging ? (
                    <>
                      <Form onSubmit={LoginSubmit}>
                        <Form.Group
                          as={Col}
                          controlId="formGridName"
                          className="mb-3"
                        >
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={nameEntered}
                            onChange={(e) => setNameEntered(e.target.value)}
                            placeholder="First name Patricia?"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={emailEntered}
                            onChange={(e) => setEmailEntered(e.target.value)}
                            placeholder="doglover@email.com"
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formGridPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={passwordEntered}
                            onChange={(e) => setPasswordEntered(e.target.value)}
                            placeholder="Code to the safe with all the dog treats..."
                          />
                        </Form.Group>

                        <Button
                          className="button-primary mt-4 p-2 w-100 w-md-25"
                          type="submit"
                        >
                          Log In
                        </Button>
                      </Form>
                    </>
                  ) : (
                    <>
                      <Form onSubmit={RegisterSubmit}>
                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md={12}
                            lg={6}
                            controlId="formGridName"
                            className="mb-3 mb-lg-0"
                          >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter your first name"
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                              type="text"
                              value={surname}
                              onChange={(e) => setSurname(e.target.value)}
                              placeholder="Enter your last name"
                            />
                          </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formGridConfirmEmail"
                        >
                          <Form.Label>Confirm Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={reEmail}
                            onChange={(e) => setReEmail(e.target.value)}
                            placeholder="Confirm your email"
                          />
                        </Form.Group>

                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            md={12}
                            lg={6}
                            controlId="formGridPassword"
                            className="mb-3 mb-lg-0"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter a password (min 6 characters)"
                            />
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            controlId="formGridConfirmPassword"
                          >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              value={rePassword}
                              onChange={(e) => setRePassword(e.target.value)}
                              placeholder="Confirm your password"
                            />
                          </Form.Group>
                        </Row>

                        <Button
                          className="button-primary mt-4 p-2 w-100 w-md-50"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Form>
                    </>
                  )}
                </Row>

                <Row className="m-0 justify-content-center">
                  <Col
                    id="pre-change-form-text"
                    xs="auto"
                    className="pe-0"
                    style={{
                      color: "var(--grey)",
                    }}
                  >
                    {isLogging ? (
                      <>Don't have an account?</>
                    ) : (
                      <>Already have an account?</>
                    )}
                  </Col>
                  <Col
                    id="change-form-text"
                    xs="auto"
                    className="ps-2"
                    onClick={ChangeForm}
                  >
                    {isLogging ? <>Sign Up</> : <>Log In</>}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
