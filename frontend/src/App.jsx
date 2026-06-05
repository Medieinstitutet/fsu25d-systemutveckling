import React, { useState, useContext, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProductCard from "./ProductCard";
import CartContext from './CartContext';
import Cart from './Cart';
import LoginForm from './LoginForm'
import UserContext from './UserContext'

function App() {

  const [values, setValues] = useState({"items": []});
  const [user, setUser] = useState(null);

  useEffect(() => {
    let savedCart = window.localStorage.getItem("cart");
    if(savedCart) {
      setValues(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    let loadData = async () => {
      let reponse = await fetch("/api/me/");
      let data = await reponse.json();
      console.log(data);
      if(data.username) {
        setUser(data.username);
      }
    }
    loadData();
  }, []);

  let updateCart = (newValues) => {
    console.log("updateCart");
    window.localStorage.setItem("cart", JSON.stringify(newValues));
    setValues(newValues);
  }

  return (
    <>
    <CartContext value={{values, setValues: updateCart}}>
      <UserContext value={{user, setUser}}>
        {user}
        <ProductCard id={1} />
        <ProductCard id={2} />
        <ProductCard id={3} />
        <Cart />
        <LoginForm />
      </UserContext>
      
    </CartContext>
      
    </>
  )
}

export default App
