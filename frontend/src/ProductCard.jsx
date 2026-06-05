import React, { useState, useContext } from 'react'
import CartContext from './CartContext';

function ProductCard(props) {

  const {values, setValues} = useContext(CartContext);

  return (
    <div>
        Product card {props.id}
        <button onClick={() => {
            console.log(values);
            values.items.push({"id": props.id, "title": "product " + props.id});
            console.log(values.items);
            setValues({...values})
            console.log(values);
        }}>
            Add to cart
        </button>
    </div>
  )
}

export default ProductCard
