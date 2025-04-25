import React from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../RTK-Store/authSlice';
import authService from "../appwrite/auth";
import logo from "../../public/blog-writer-logo.jpg";
import Navigation from "./Navigation";


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    authService.logout()
    .then(()=>dispatch(logout()))
    navigate('/login');
  };

  return (
    <nav
      style={{
        padding: "10px",
        backgroundColor: "lightblue",
        marginBottom: "5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <span className=" max-w-[100px] mr-14">
        <img
          src={logo}
          alt="Website Logo"
          width="70"
          height="50"
          className="rounded-full"
        />
      </span>
      <span className="text-2xl font-bold text-emerald-500">
        <h2>Blogs Writer</h2>
      </span>
      <Navigation
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        navigate={navigate}
      />
      
    </nav>
  );
}

export default Header;