import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Login", special: true },
  ];

  const isLaborPage = location.pathname.startsWith("/labor");

  const getLinkClasses = (isActive, special) => {
    if (special) {
      return `px-4 py-1 rounded-md transition-all duration-200 font-semibold shadow-sm ${
        isActive
          ? "bg-lime-600 text-white scale-110 shadow-lg"
          : "bg-white text-amber-800 hover:bg-gray-100"
      }`;
    } else {
      return `transition-all duration-200 px-3 py-1 rounded-md ${
        isActive
          ? "bg-gradient-to-r from-amber-600 to-yellow-500 text-white scale-110 shadow-md"
          : "text-white hover:bg-yellow-600 hover:shadow"
      }`;
    }
  };

  return (
    <nav
      className={`${
        isLaborPage
          ? "bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-600"
          : "bg-amber-700"
      } text-white px-6 py-4 flex justify-between items-center h-20 shadow-md fixed top-0 w-full z-50`}
    >
      <div className="text-3xl font-bold tracking-wide drop-shadow-sm">
        ShramMitra
      </div>
      <div className="space-x-6 flex items-center">
        {navLinks.map(({ to, label, special }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={getLinkClasses(isActive, special)}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
