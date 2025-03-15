import { Form, Button } from "react-bootstrap";
import UseProducts from "../hooks/products/UseProducts";
import Swal from "sweetalert2";
import { useRef } from "react";

function CreateProductsForm() {
  const {
    nombre,
    setNOmbre,
    descripcion,
    setDescripcion,
    precio,
    setPrecio,
    genero,
    setGenero,
    categoria,
    setCategoria,
    setimages,
    handleSubmit,
    message,
    setMessage,
    loading,
  } = UseProducts();

  const fileInputRefs = [useRef(null), useRef(null), useRef(null)]; // Un ref para cada input de archivo

  const handleFiles = (Event, index) => {
    const file = Event.target.files[0];
    if (file) {
      setimages((prevImages) => {
        const newImage = [...prevImages];
        newImage[index] = file;
        return newImage;
      });
    }
  };

  const limpiarCampos = () => {
    setNOmbre("");
    setCategoria("");
    setPrecio(0);
    setDescripcion("");
    setGenero("");
    setimages([]);
    setMessage("");

    // Limpiar cada input de tipo file
    fileInputRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.value = "";
      }
    });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    Swal.fire({
      title: "Producto Guardado",
      text: message,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    limpiarCampos();
  };

  return (
    <>
      <h2 className="text-center mb-4">Crear un Producto</h2>
      <Form
        className="mx-auto w-100"
        style={{ maxWidth: "500px" }}
        onSubmit={guardarProducto}
      >
        <Form.Group className="mb-3 d-flex " controlId="nombreProducto">
          <Form.Label className="me-4">Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Camiseta Hombre"
            value={nombre}
            onChange={(e) => setNOmbre(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 d-flex " controlId="descripcionProducto">
          <Form.Label className="me-4">Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Camiseta blanca talla M"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 d-flex " controlId="precioProducto">
          <Form.Label className="me-4">Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="2000"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 d-flex " controlId="generoProducto">
          <Form.Label className="me-4">Género</Form.Label>
          <Form.Select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option>Hombre</option>
            <option>Mujer</option>
            <option>Kids</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 d-flex " controlId="categoriaProducto">
          <Form.Label className="me-4">Categoría</Form.Label>
          <Form.Select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option>Pijamas</option>
            <option>Casual</option>
            <option>Deportiva</option>
            <option>Formal</option>
          </Form.Select>
        </Form.Group>

        {/* Inputs de archivos con diferentes refs */}
        <Form.Group
          controlId="imagenPrincipal"
          className="mb-3 d-flex fileInput"
        >
          <Form.Label>Imagen Principal</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFiles(e, 0)}
            ref={fileInputRefs[0]}
          />
        </Form.Group>

        <Form.Group
          controlId="imagenReferencia1"
          className="mb-3 d-flex fileInput"
        >
          <Form.Label className="me-4">Imagen de referencia 1</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFiles(e, 1)}
            ref={fileInputRefs[1]}
          />
        </Form.Group>

        <Form.Group
          controlId="imagenReferencia2"
          className="mb-3 d-flex fileInput"
        >
          <Form.Label className="me-4">Imagen de referencia 2</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => handleFiles(e, 2)}
            ref={fileInputRefs[2]}
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default CreateProductsForm;
