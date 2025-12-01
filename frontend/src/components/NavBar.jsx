import { Link } from "react-router-dom";
import { useState } from "react";
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 opacity-100 hover:opacity-90 transition-opacity duration-300">
      <div className="flex flex-row justify-between p-3 mb-4 bg-gradient-to-br from-purple-900 via-purple-800 to-gray-800 text-white border border-gray-700 rounded-b-md">
          <Link className="text-xl font-bold scale-100 hover:scale-105 transition-all" to="/">Movie App</Link>
        <div className="flex justify-center gap-5">
            <Link to="/" className="text-md font-semibold hover:scale-105 transition-all">Home</Link>
            <Link to="/Favorites" className="text-md font-semibold hover:scale-105 transition-all"> Favorites</Link> 
        </div>
      </div>
    </nav>
  );
}