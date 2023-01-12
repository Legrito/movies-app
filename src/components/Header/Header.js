import { NavLink} from 'react-router-dom';

export const Header = () => {
    return (
        <ul className="header__nav">
      <li>
        <NavLink exact to="/" className={({ isActive }) => `NavLink ${isActive ? "NavLink--active" : ""}`} >Home</NavLink>
      </li>
      <li>
        <NavLink to="/movies" className={({ isActive }) => `NavLink ${isActive ? "NavLink--active" : ""}`}>Movies</NavLink>
      </li>
    </ul>
    );
};