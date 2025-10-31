import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-blue-500 text-white p-4">
            <nav className="flex gap-4">
                <Link to="/">Home</Link> 
                <Link to="/About">About</Link>
                <Link to="/cart">Cart</Link>
            </nav>
   </header> 
   );
}

export default Header;  
