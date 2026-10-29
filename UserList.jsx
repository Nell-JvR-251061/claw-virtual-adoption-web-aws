import { Row, Col, ListGroup, Button, Spinner } from "react-bootstrap";

import "../../styling/AnimalList.css";

function UserList(_users) {
  const API = "https://claw-virtual-adoption-web-production.up.railway.app/api";

  const DeleteUser = async (userId) => {
    //function to delete selected user
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`${API}/auth/delete/${userId}`, {
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

  return (
    <>
      <ListGroup id="animal-list-group">
        <ListGroup.Item className="title-item px-4 pt-3 pb-1">
          <Row>
            <Col className="list-title">Users</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item className="list-headers">
          <Row className="text-center">
            <Col>Name</Col>
            <Col>Surname</Col>
            <Col>Email</Col>
            <Col>Joined</Col>
            <Col>Role</Col>
            <Col>Action</Col>
          </Row>
        </ListGroup.Item>

        {_users?._users?.length > 0 ? (
          _users._users.map((user, index) => (
            <ListGroup.Item
              as="button"
              className="list-user"
              key={user._id ?? index}
            >
              <Row className="d-flex align-items-center text-start">
                <Col>{user.name}</Col>
                <Col>{user.surname}</Col>
                <Col>{user.email}</Col>
                <Col className="text-center">
                  {(() => {
                    let value = user.createdAt;

                    if (
                      typeof value === "string" &&
                      value.includes("T") &&
                      value.endsWith("Z")
                    ) {
                      return value.replace("T", " | ").slice(0, 18);
                    } else if (value !== null && typeof value === "object") {
                      return JSON.stringify(value);
                    }
                    return String(value ?? "");
                  })()}
                </Col>
                <Col className="text-center">{user.role}</Col>
                <Col className="text-center">
                  <a
                    className="red-link"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      DeleteUser(user._id);
                    }}
                  >
                    Remove
                  </a>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="text-center">
            <Spinner animation="border" variant="primary" />
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
}

export default UserList;
