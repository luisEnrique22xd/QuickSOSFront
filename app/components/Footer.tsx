import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-2">Contacto</h3>
          <p>📞 911</p>
          <p>📧 contacto@alertasegura.com</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Enlaces Rápidos</h3>
          <ul>
            <li><Link href="/nosotros" className="text-gray-300 hover:text-white">Sobre Nosotros</Link></li>
            <li><Link href="/ayuda" className="text-gray-300 hover:text-white">Centro de Ayuda</Link></li>
            <li><Link href="/reportar-incidente" className="text-gray-300 hover:text-white">Reportar Incidente</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Legal</h3>
          <ul>
            <li><Link href="/terminos" className="text-gray-300 hover:text-white">Términos de Uso</Link></li>
            <li><Link href="/privacidad" className="text-gray-300 hover:text-white">Política de Privacidad</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Redes Sociales</h3>
          <div className="flex space-x-4">

            <Link href="https://twitter.com" className="text-gray-300 hover:text-white">
              <span className="text-2xl">X</span>
            </Link>
            <Link href="https://facebook.com" className="text-gray-300 hover:text-white">
              <span className="text-2xl">f</span>
            </Link>
            <Link href="https://instagram.com" className="text-gray-300 hover:text-white">
              <span className="text-2xl">📸</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-500 text-sm">
        &copy; 2025 AlertaSegura. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;