import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import useAuth from "../hooks/auth/UseAuth";
import Swal from "sweetalert2";

function Nav1() {
  const [show, setShow] = useState(false);
  const { authenticated, login, logout, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShow = () => setShow(true); // Abre el modal
  const handleClose = () => setShow(false); // Cierra el modal

  const handleAuthentication = async (e) => {
    e.preventDefault();
    const authenticated = await login(email, setEmail, password, setPassword);
    if (authenticated) {
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: "Has iniciado sesión correctamente",
      });
      handleClose();
    }
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#">Lyssion Style</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Mujer" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/mujer/pijamas">Pijamas</NavDropdown.Item>
                <NavDropdown.Item href="/mujer/casual">Casual</NavDropdown.Item>
                <NavDropdown.Item href="/mujer/formal">Formal</NavDropdown.Item>
                <NavDropdown.Item href="/mujer/deportiva">Deportiva</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Hombre" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/hombre/pijamas">Pijamas</NavDropdown.Item>
                <NavDropdown.Item href="/hombre/casual">Casual</NavDropdown.Item>
                <NavDropdown.Item href="/hombre/formal">Formal</NavDropdown.Item>
                <NavDropdown.Item href="/hombre/deportiva">Deportiva</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Kids" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/kids/pijamas">Pijamas</NavDropdown.Item>
                <NavDropdown.Item href="/kids/casual">Casual</NavDropdown.Item>
                <NavDropdown.Item href="/kids/formal">Formal</NavDropdown.Item>
                <NavDropdown.Item href="/kids/deportiva">Deportiva</NavDropdown.Item>
              </NavDropdown>

              {authenticated && <Nav.Link href="/productos">Productos</Nav.Link>}
            </Nav>

            <div className="mx-auto">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Buscas algo?"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Buscar</Button>
              </Form>
            </div>

            {authenticated ? (
              <>
                <h4 className="ms-4 me-4 text-warning">Administrador</h4>
                <Button variant="outline-danger" onClick={logout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button variant="outline-primary" onClick={handleShow}>
                Iniciar sesión
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            Iniciar sesión
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAuthentication}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Nav1;
