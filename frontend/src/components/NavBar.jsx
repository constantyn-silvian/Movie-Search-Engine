import { Link } from "react-router-dom";
import { useState } from "react";
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-50 opacity-100 hover:opacity-80 transition-opacity duration-300">
      <div className="flex flex-row justify-between p-3 mb-4 bg-gradient-to-br from-purple-900 via-purple-800 to-gray-800 text-white border border-gray-700 rounded-b-md">
        <div>
          <Link className="text-2xl font-bold hover:font-extrabold" to="/">Movie App</Link>
        </div>
        <div className="flex justify-center gap-5">
          <div className="flex flex-row justify-evenly min-w-50 gap-5 mr-2">
            <Link to="/" className="text-xl font-semibold hover:font-bold">Home</Link>
            <Link to="/Favorites" className="text-xl font-semibold hover:font-bold"> Favorites</Link>
            {!isLoggedIn 
            ? 
            <Link to="/signup" className="text-xl font-semibold hover:font-bold">Sign Up</Link> 
            :
             <Link to="/signin" className="text-xl font-semibold hover:font-bold"> Sign In</Link>}
          </div>
        </div>
      </div>
    </nav>
  );
}