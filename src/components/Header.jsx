import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../RTK-Store/authSlice';
import authService from "../appwrite/auth";
import logo from "../../public/blog-writer-logo.jpg";

function CustomNavlink({ to, end = false, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        color: isActive ? "green" : "grey",
      })}
    >
      {children}
    </NavLink>
  );
}

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
        marginBottom: "10rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span className=" max-w-[100px] mr-14">
        <img src={logo} alt="Website Logo" width="70" height="50" />
      </span>
      <span className="text-2xl font-bold text-emerald-500">
        <h2>Blogs Writer</h2>
      </span>
      <span>
        <CustomNavlink to="/" end={true}>
          Home
        </CustomNavlink>

        {isLoggedIn ? (
          <>
            <CustomNavlink to="/allposts">All Posts</CustomNavlink>
            <CustomNavlink to="/addpost">Add Post</CustomNavlink>
            <button className="header-btns" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="header-btns" onClick={() => navigate("/login")}>
              Login
            </button>

            <button
              className="header-btns"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}
      </span>
    </nav>
  );
}

export default Header;