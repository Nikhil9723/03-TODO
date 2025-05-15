import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <ul className="flex gap-3 bg-black text-white p-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/todo">Todo</Link>
      </ul>
    </>
  );
}
