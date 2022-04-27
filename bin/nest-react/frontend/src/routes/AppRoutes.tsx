import React from "react"
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import LoginPage from "../components/pages/LoginPage"
import SignupPage from "../components/pages/SignupPage"
import Home from "../components/pages/Home"
import NotFoundPage from "../components/pages/NotFoundPage"


const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes