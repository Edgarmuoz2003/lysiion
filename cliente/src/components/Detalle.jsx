function Detalle() {
  return (
    <div className="detalle">
      <h2>{producto.nombre}</h2>
      <img src={producto.imagen} alt={producto.nombre} />
      <p>Descripción: {producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
    </div>
  );
}

export default Detalle;