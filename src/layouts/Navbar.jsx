import { Link } from "react-router-dom";
import "./styles.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="users">Users</Link>
      <Link to="devices">Devices</Link>
      <Link to="users/new">New User</Link>
      <Link to="devices/new">New Device</Link>
    </div>
  );
};
