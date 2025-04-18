import axios from "axios";

const getOneProduct = async (id) => {
   try {
    const response = await axios.get(
      `http://localhost:4000/api/getOneProduct/${id}`
    );

    if (!response) {
        console.log("Error al obtener el producto");
        throw new Error("Error al obtener el producto");
    } else {
        const producto = response.data;
        console.log("la condicion se cumplio y el producto es: " + producto);
      return producto;
    }
   } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ocurrió un error inesperado"
    );
   }
  }

  
export default getOneProduct;