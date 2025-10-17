import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="flex flex-row justify-between p-4 mb-4 bg-black">
        <div>
          <Link className="text-xl font-medium" to="/">Movie App</Link>
        </div>
        <div className="flex flex-row justify-evenly min-w-50">
          <Link to="/">Home</Link>
          <Link to="/Favorites">Favorites</Link>
        </div>
      </div>
    </nav>
  );
}