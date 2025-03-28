import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoutes";
import Login from "../components/Login";
import UserList from "../components/UserList";

const AppRoutes = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>}/>
        <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRoutes