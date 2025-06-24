import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold text-gray-800 flex items-center">
          <span className="mr-2 text-red-500">⚠️</span>
          AlertaSegura
        </Link>
      </div>
      <div className="hidden md:flex md:items-center md:space-x-8">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
          Inicio
        </Link>
        <Link href="/components/Alertas" className="text-gray-600 hover:text-gray-900">
          Alertas
        </Link>
        <Link href="/components/Mapa" className="text-gray-600 hover:text-gray-900">
          Mapa
        </Link>
        <Link href="/components/Estadisticas" className="text-gray-600 hover:text-gray-900">
          Estadísticas
        </Link>

      </div>
      
      <div className="hidden md:flex items-center space-x-4">
      </div>
    </nav>
  );
};

export default Navbar;