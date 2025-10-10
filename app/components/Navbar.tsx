"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/components/Alertas", label: "Alertas" },
    { href: "/components/Mapa", label: "Mapa" },
    { href: "/components/Estadisticas", label: "Estadísticas" },
  ];

  return (
    <nav className="bg-white p-4 shadow-md flex justify-between items-center relative">
      <div className="flex items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 flex items-center"
        >
          <span className="mr-2 text-red-500">⚠️</span>
          AlertaSegura
        </Link>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-gray-800 focus:outline-none"
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div className="hidden md:flex md:items-center md:space-x-8 absolute left-1/2 transform -translate-x-1/2">
        {links.map((link) => (
          <div key={link.href} className="relative">
            <Link
              href={link.href}
              className={`${
                pathname === link.href ? "text-gray-900 font-semibold" : "text-gray-600"
              } hover:text-gray-900 transition-colors`}
            >
              {link.label}
            </Link>
            {pathname === link.href && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-1 h-[3px] bg-gray-700 rounded"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)} 
              className={`${
                pathname === link.href ? "text-gray-900 font-semibold" : "text-gray-600"
              } hover:text-gray-900 transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
