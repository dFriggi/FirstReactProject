import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const handleClick = () => {
    onLogout(null)
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">

        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-blue-400 transition">
            Lista
          </Link>
        </div>

        <ul className="flex space-x-8">
          <li>
            <Link to="/manager" className="hover:text-blue-400 transition duration-300">
              Gerenciador
            </Link>
          </li>
          <li>
            <a onClick={handleClick} href="#servicos" className="bg-blue-800 p-2 rounded-lg shadow-md hover:bg-blue-400 transition duration-300">
              Logout
            </a>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;