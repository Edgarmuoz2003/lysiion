import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <>
      <h1 className="text-center mt-5">Nuestras Categorías</h1>
      <div>
        <Container className="my-5">
          <Row className="text-center">
            <Col md={3} className="mb-4 Categorias">
              <Link to="/Mujer/Pijamas">
                <img
                  src="/CPijamas.png"
                  alt="Categoria Pijamas"
                  className="img-fluid"
                />
                <h3 className="CTitle">Pijamas</h3>
              </Link>
            </Col>
            <Col md={3} className="mb-4 Categorias">
              <Link to="/Mujer/Casual">
                <img
                  src="/Ccasual.jpg"
                  alt="Categoria 2"
                  className="img-fluid"
                />
                <h3 className="CTitle">Casual</h3>
              </Link>
            </Col>
            <Col md={3} className="mb-4 Categorias">
              <Link to="/Mujer/Deportivos">
                <img
                  src="/Cdeportivo.jpg"
                  alt="Categoria 3"
                  className="img-fluid"
                />
                <h3 className="CTitle">Deportivos</h3>
              </Link>
            </Col>
            <Col md={3} className="mb-4 Categorias">
              <Link to="/Mujer/Formal">
                <img
                  src="/Cformal.png"
                  alt="Categoria 3"
                  className="img-fluid"
                />
                <h3 className="CTitle">Formal</h3>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Categories;
