import './index.css';
import { NavLink, useLocation } from "react-router";

function Navbar() {
  const location = useLocation();

  return (
    <nav>
        <div> 
          <NavLink className={location.pathname=='/' ? "active" : ""} to="/">DESTAQUES</NavLink>
          <NavLink className={location.pathname=='/catalog' ? "active" : ""} to="/catalog">CATÁLOGO</NavLink>
          <NavLink className={location.pathname=='/admin' ? "active" : ""} to="/admin">ADMINISTRAÇÃO</NavLink>
        </div>

    </nav>
  )
}

export default Navbar
