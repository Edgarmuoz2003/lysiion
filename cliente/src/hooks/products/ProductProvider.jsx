import ProductContext from "./ProductContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ProductProvider = ({ children }) => {
  const [nombre, setNOmbre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [genero, setGenero] = useState("");
  const [categoria, setCategoria] = useState("");
  const [images, setimages] = useState([]);
  const [productos, setProductos] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("genero", genero);
    formData.append("categoria", categoria);
    images.forEach((img) => {
      formData.append("images", img);
    });
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/createProducts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Ocurrio un error inesperado"
      );
      console.log(error);
    }
    setLoading(false);
  };

  const getProducts = async () => {
    const response = await axios.get(
      "http://localhost:4000/api/searchProducts"
    );
    if (response.status === 201) {
      setProductos(response.data);
    } else {
      setMessage(response.data.message);
    }
  };

  const deleteProducts = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:4000/api/deleteOneProduct/${id}`
      );

      if (response.status === 404) {
        setError(response.data.message);
      }

      if (response.status === 200) {
        setMessage(response.data.message);
        setError("");
        getProducts();
      }
    } catch (err) {
      console.log("A ocurrido un error " + err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (productos.length === 0) {
      getProducts();
    }
  }, [productos.length]);

  return (
    <ProductContext.Provider
      value={{
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
        images,
        setimages,
        handleSubmit,
        productos,
        setProductos,
        message,
        setMessage,
        loading,
        setLoading,
        error, 
        setError,
        deleteProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductProvider;
