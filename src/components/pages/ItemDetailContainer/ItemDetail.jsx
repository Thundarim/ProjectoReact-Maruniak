import React, { useContext, useState } from 'react';
import './itemDetail.css';
import CounterContainer from '../../common/counter/counterContainer';
import { CartContext } from '../../../context/CartContext';
import Swal from 'sweetalert2';

const ItemDetail = ({ item }) => {
  const { addToCart, getQuantityById } = useContext(CartContext);
  const [totalQuantity, setTotalQuantity] = useState(getQuantityById(item.id) || 0);

  const handleAddToCart = (quantity) => {
    addToCart({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      quantity,
    });

    Swal.fire('Añadido al Carrito', `Añadido ${quantity} ${item.nombre}(s) a tu carrito.`, 'success');
  };

  const itemInCart = totalQuantity > 0;

  return (
    <div className="item-detail-container">
      <h3>{item.nombre}</h3>
      <img src={item.imageUrl} alt={item.nombre} />
      {item.stock && !isNaN(item.stock) && item.stock > 0 ? (
        <>
          <p>Stock: {item.stock}</p>
          <p>Categoría: {item.categoria}</p>
          <p>Precio: ${item.precio}</p>
          <p>Descripción: {item.descripcion}</p>
          {itemInCart ? (
            <p>Este producto ya está en tu carrito.</p>
          ) : (
            <CounterContainer
              stock={item.stock}
              addToCart={handleAddToCart}
              product={item}
            />
          )}
        </>
      ) : (
        <p>Actualmente no está disponible</p>
      )}
    </div>
  );
};

export default ItemDetail;
