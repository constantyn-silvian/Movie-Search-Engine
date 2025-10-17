import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="flex flex-row justify-between p-4 mb-4 bg-black text-purple-700">
        <div>
          <Link className="text-xl font-medium hover:font-bold" to="/">Movie App</Link>
        </div>
        <div className="flex flex-row justify-evenly min-w-50">
          <Link to="/" className=" hover:font-bold">Home</Link>
          <Link to="/Favorites" className=" hover:font-bold"> Favorites</Link>
        </div>
      </div>
    </nav>
  );
}