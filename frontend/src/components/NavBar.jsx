import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">Movie App</Link>
      </div>
      <div className="flex flex-row justify-evenly">
        <Link to="/">Home</Link>
        <Link to="/Favorites">Favorites</Link>
      </div>
    </nav>
  );
}