import { useParams } from "react-router-dom";
import UseProducts from "../hooks/products/UseProducts";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const VistaProductos = () => {
  const { gender, category } = useParams();
  const { productos } = UseProducts();

  const filteredProducts = productos.filter(
    (producto) => producto.genero === gender && producto.categoria === category
  );

  UseProducts;
  return (
    <>
      <p className="ms-3">
        {gender}/{category}
      </p>

      <Container>
        <Row className="ms-5 me-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((producto) => (
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
                <p className="price-min">
                  {producto.precio.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </Col>
            ))
          ) : (
            <Col className="text-center mt-5">
              <h2>No hay productos disponibles en esta categoría</h2>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};
export default VistaProductos;
