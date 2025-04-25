import { NavLink } from "react-router-dom";


function CustomNavlink({ to, end = false, children ,...props}) {
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        color: isActive ? "green" : "grey",
      })}
      {...props}
    >
      {children}
    </NavLink>
  );
}

export default CustomNavlink;