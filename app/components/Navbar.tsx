"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/components/Alertas", label: "Alertas" },
    { href: "/components/Mapa", label: "Mapa" },
    { href: "/components/Estadisticas", label: "Estadísticas" },
  ];

  return (
    <nav className="bg-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 flex items-center"
        >
          <span className="mr-2 text-red-500">⚠️</span>
          AlertaSegura
        </Link>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2
                      hidden md:flex md:items-center md:space-x-8 ">
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
    </nav>
  );
};

export default Navbar;
