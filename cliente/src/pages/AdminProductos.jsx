import { Container, Row, Col } from "react-bootstrap";
import CreateProductsFOrm from "../components/CreateProductsForm";
import { useState } from "react";
import UseProducts from "../hooks/products/UseProducts";

function AdminProductos() {
  const [vistaActual, setVistaActual] = useState(null);
  const { productos } = UseProducts();

  const changeView = (view) => {
    setVistaActual(view);
  };
  const handleShowVIew = () => {
    switch (vistaActual) {
      case "crear":
        return <CreateProductsFOrm />;
      default:
        return (
          <>
            {productos ? (
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
                    </Col>
                  ))}
                </Row>
              </Container>
            ) : (
              <h4
                className="d-flex align-items-center justify-content-center vh-100 text-center"
                style={{ color: "gray" }} // Gris claro
              >
                Bienvenido a Lyssion Style; por favor seleccione una opción
              </h4>
            )}
          </>
        );
    }
  };

  return (
    <>
      <div className="container text-center mt-4">
        <h1>Administrar Productos</h1>
      </div>

      <Container>
        <Row>
          <Col
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              margin: "5px",
              padding: "30px",
            }}
          >
            <div>
              <button
                className="btn btn-info"
                style={{ width: "100%" }}
                onClick={() => changeView("crear")}
              >
                Crear
              </button>
            </div>
          </Col>
          <Col xl={10}>{handleShowVIew()}</Col>
        </Row>
      </Container>
    </>
  );
}
export default AdminProductos;
