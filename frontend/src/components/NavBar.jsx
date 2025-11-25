import { Link } from "react-router-dom";
import { useState } from "react";
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-50 opacity-100 hover:opacity-90 transition-opacity duration-300">
      <div className="flex flex-row justify-between p-3 mb-4 bg-gradient-to-br from-purple-900 via-purple-800 to-gray-800 text-white border border-gray-700 rounded-b-md">
        <div>
          <Link className="text-xl font-bold hover:font-extrabold" to="/">Movie App</Link>
        </div>
        <div className="flex justify-center gap-5">
          <div className="flex flex-row justify-evenly min-w-50 gap-5 mr-2">
            <Link to="/" className="text-md font-medium hover:font-semibold">Home</Link>
            <Link to="/Favorites" className="text-md font-medium hover:font-semibold"> Favorites</Link>
            {!isLoggedIn 
            ? 
            <Link to="/signup" className="text-md font-medium hover:font-semibold">Sign Up</Link> 
            :
             <Link to="/signin" className="text-md font-medium hover:font-semibold"> Sign In</Link>}
          </div>
        </div>
      </div>
    </nav>
  );
}