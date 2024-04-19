import React from 'react'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';
import All from './All';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/allrecipes" element={<All />} />
       
      </Routes>
    </BrowserRouter>)
}

export default App