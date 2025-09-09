import Alertas from './components/Alertas/AlertasActivas';
import Estadisticas from './components/Estadisticas/Estadisticas';
import Footer from './components/Footer';
import Mapa from "@/app/components/Mapa/Mapa";
import Navbar from './components/Navbar';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="container mx-auto p-6 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Alertas />
            <Estadisticas />
          </div>
          <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                  <Mapa/>
                </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}