import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
  ];

  return (
    <header className="py-4 bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg fixed w-full z-10 top-0 left-0">
      <nav className="container mx-auto flex justify-between items-center px-6">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          Quizzite
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-5 py-2 text-white text-lg font-medium rounded-lg transition duration-300 hover:bg-gray-600 hover:shadow-lg"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
