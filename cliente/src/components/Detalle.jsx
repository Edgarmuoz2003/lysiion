import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getOneProduct from "../utils/services/productos.services";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaHandPaper,
  FaBan,
  FaTshirt,
  FaTemperatureLow,
  FaWater,
  FaSoap,
  FaRegSnowflake,
} from "react-icons/fa";
import { MdIron } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";

function Detalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [imagenPrincipal, setImagenPrincipal] = useState(null); // Nueva variable

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const data = await getOneProduct(id);
        setProducto(data);
        setImagenPrincipal(data.images[0]); // Mostrar imagen[0] por defecto
      } catch (err) {
        setError(err.message);
      }
    };

    obtenerProducto();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <Container>
      <p>
        {producto.genero} / {producto.categoria} / {producto.nombre}
      </p>
      <Row className="m-5">
        <Col md={1}>
          {producto.images.slice(1).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Vista ${index + 2}`}
              className="img-fluid mb-2 detail-image"
              onMouseEnter={() => setImagenPrincipal(img)}
              onMouseLeave={() => setImagenPrincipal(producto.images[0])}
            />
          ))}
        </Col>
        <Col md={6}>
          <img
            src={imagenPrincipal}
            alt={producto.nombre}
            className="img-fluid detail-main-image"
          />
        </Col>

        <Col md={5}>
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>

          <p className="price">
            {producto.precio.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>

          <hr />

          {/* Colores disponibles */}
          <div className="mb-3">
            <p>
              <strong>Colores disponibles:</strong>
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <BsCircleFill style={{ color: "black", fontSize: "1.8rem" }} />
              <BsCircleFill
                style={{
                  color: "white",
                  fontSize: "1.8rem",
                  border: "1px solid #ccc",
                }}
              />
              <BsCircleFill style={{ color: "red", fontSize: "1.8rem" }} />
              <BsCircleFill style={{ color: "blue", fontSize: "1.8rem" }} />
              <BsCircleFill style={{ color: "green", fontSize: "1.8rem" }} />
              <BsCircleFill style={{ color: "purple", fontSize: "1.8rem" }} />
              <BsCircleFill style={{ color: "orange", fontSize: "1.8rem" }} />
              <BsCircleFill style={{ color: "gray", fontSize: "1.8rem" }} />
            </div>
          </div>

          <hr />

          {/* Tallas disponibles */}
          <div className="mb-3">
            <p>
              <strong>Tallas disponibles:</strong>
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {["XS", "S", "M", "L", "XL", "XXL"].map((talla, idx) => (
                <span
                  key={idx}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    fontWeight: "bold",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  {talla}
                </span>
              ))}
            </div>
          </div>

          <hr />

          {/* Recomendaciones de cuidado */}
          <div>
            <p>
              <strong>Recomendaciones de cuidado:</strong>
            </p>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <FaHandPaper size={35} />
                <p style={{ fontSize: "12px" }}>Lavar a mano</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaBan size={35} />
                <p style={{ fontSize: "12px" }}>No usar cloro</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaTshirt size={35} />
                <p style={{ fontSize: "12px" }}>No secadora</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaTemperatureLow size={35} />
                <p style={{ fontSize: "12px" }}>Lavar con agua fría</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <MdIron size={35} />
                <p style={{ fontSize: "12px" }}>Planchar a baja temperatura</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaWater size={35} />
                <p style={{ fontSize: "12px" }}>No remojar</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaSoap size={35} />
                <p style={{ fontSize: "12px" }}>Usar jabón suave</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaRegSnowflake size={35} />
                <p style={{ fontSize: "12px" }}>Secar a la sombra</p>
              </div>
            </div>
          </div>

          <hr />

          {/* Botón añadir al carrito */}
          <div className="mt-4 text-center">
            <button className="btn btn-dark">🛒 Añadir al carrito</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Detalle;
