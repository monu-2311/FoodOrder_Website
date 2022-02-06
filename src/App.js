import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const[cartShow,setCartIsShow] = useState(false);
  const showCartHandler=()=>{
    setCartIsShow(true);
  };
  const hiddenCartHandler=()=>{
    setCartIsShow(false);
  };
  return (
    <CartProvider>
      {cartShow && <Cart onHideCart={hiddenCartHandler}/>}
      <Header onCartShow={showCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
};

export default App;
