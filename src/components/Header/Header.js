import { NavLink} from 'react-router-dom';

export const Header = () => {
    return (
        <ul className="header__nav">
      <li>
        <NavLink exact to="/" className="NavLink" activeClassName="NavLink--active" >Home</NavLink>
      </li>
      <li>
        <NavLink to="/movies" className="NavLink" activeClassName="NavLink--active" >Movies</NavLink>
      </li>
    </ul>
    );
};