import { useParams } from "react-router-dom";

const VistaProductos = () => {
  const { gender, category } = useParams();
  return (
    <>
      <p className="ms-3">
        {gender}/{category}
      </p>
      <div className="container">
        <div>
          <h1>Hola {gender}</h1>
        </div>
      </div>
    </>
  );
};
export default VistaProductos;
