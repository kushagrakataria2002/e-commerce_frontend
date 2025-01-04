import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import Home from "./pages/Home.jsx"; 
import Register from "./pages/Register.jsx"; 
import Login from "./pages/Login.jsx"; 
import Navbar from './components/Navbar.jsx';
import Profile from "./pages/Profile.jsx"; 
import Cart from "./pages/Cart.jsx"; 
import Single from "./pages/Single.jsx"; 

const App = () => {

  const is_user = false; 

  return (
    <>
    <Router>

      <Navbar/>

    <Routes>

    <Route path='/' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/product/:id' element={<Single/>} />

    </Routes>

    </Router>
    </>
  )
}

export default App