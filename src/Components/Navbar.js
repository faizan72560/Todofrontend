import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2><Link style={{ textDecoration: "none", color: "white" }} to="/">My App</Link></h2>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add Post</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
