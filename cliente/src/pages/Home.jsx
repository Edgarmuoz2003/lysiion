import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import UseProducts from "../hooks/products/UseProducts";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

function Home() {
  const { productos } = UseProducts();

  const newProducts = [...productos]
    .sort((a, b) => b._id.localeCompare(a._id))
    .slice(0, 4);

  return (
    <>
      {/* baner de inicio */}
      <div className="banner1">
        <img src="/bannerInicio.png" alt="Banner de Inicio" />
      </div>

      {/* Nuevos Productos */}
      <div>
        <Container className="my-5">
          <h3 className="text-center mb-4">Nuevos Productos</h3>
          <Marquee pauseOnHover={true} speed={40} gradient={false}>
            {newProducts.map((producto) => (
              <div key={producto._id} className="mx-4">
                <Link
                  to={`/Detalle/${producto._id}`}
                  className="text-decoration-none"
                >
                  <img
                    src={producto.images[0]}
                    alt={producto.nombre}
                    style={{
                      height: "400px",
                      width: "400px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <p className="text-center mt-2" style={{ fontSize: "20px" }}>
                    {producto.nombre} - 
                    {producto.precio.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </Link>
              </div>
            ))}
          </Marquee>
        </Container>
      </div>

      <Container>
        <Row className="ms-5 me-5">
          {productos.map((producto) => (
            <Col lg={3} key={producto.id}>
              <Link
                to={`/Detalle/${producto._id}`}
                className="text-decoration-none"
              >
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
              </Link>
              <p className="name-product">{producto.nombre}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
