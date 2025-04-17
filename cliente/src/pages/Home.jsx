import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import UseProducts from "../hooks/products/UseProducts";

function Home() {
  const { productos } = UseProducts();

  return (
    <>
      <div className="banner1">
        <img src="/bannerInicio.png" alt="Banner de Inicio" />
      </div>
      <Container>
        <Row>
          {productos.map((producto) => (
            <Col lg={4} key={producto.id}>
              <div className="product-card ">
                <img
                  src={producto.images[0]}
                  alt={producto.nombre}
                  className="normal-image"
                />
                <img
                  src={producto.images[1]}
                  alt={producto.nombre}
                  className="hover-image"
                />
              </div>

              <p>{producto.nombre}</p>
              {console.log(producto.images[0])}]
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
