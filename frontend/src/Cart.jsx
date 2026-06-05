import React, { useState, useContext } from 'react'
import CartContext from './CartContext';

export default function Cart(props) {

  let {values, setValues} = useContext(CartContext);

  return (
    <div>
        {values.items.map((id) => {
            return <div>Product {id}</div>
        })}
    </div>
  )
}
