import { Container, Row, Col, Button } from "react-bootstrap";
import CreateProductsFOrm from "../components/CreateProductsForm";
import { useState, useEffect } from "react";
import UseProducts from "../hooks/products/UseProducts";

function AdminProductos() {
  const [vistaActual, setVistaActual] = useState(null);
  const {
    productos,
    error,
    setError,
    message,
    setMessage,
    deleteProducts,
    loading,
  } = UseProducts();

  const changeView = (view) => {
    setVistaActual(view);
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Resetea el mensaje después de 3 segundos
      }, 3000);

      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }
  }, [message, setMessage]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // Resetea el mensaje después de 3 segundos
      }, 3000);

      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }
  }, [error, setError]);

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
                    <Col lg={4} key={producto._id}>
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
                      <div>
                        <Button
                          className="btn-danger"
                          onClick={() => deleteProducts(producto._id)}
                        >
                          eliminar
                        </Button>
                      </div>
                    </Col>
                  ))}
                  <div className="text-center">
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      {loading && "eliminando..."}
                    </p>

                    {message && (
                      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        {message}
                      </p>
                    )}

                    {error && (
                      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        {error}
                      </p>
                    )}
                  </div>
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
