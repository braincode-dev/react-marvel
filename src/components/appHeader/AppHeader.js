import { Link, NavLink } from "react-router-dom";
import './appHeader.scss';

const AppHeader = () => {
    const activeStyle = (active) => active ? {"color" : "#9F0013"} : null;
    
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                        style={({ isActive }) => activeStyle(isActive)} 
                        to="/"
                        >Characters</NavLink></li>
                    /
                    <li><NavLink 
                        style={({ isActive }) => activeStyle(isActive)}
                        to="/comics"
                        >Comics</NavLink ></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;