// app/mapa/page.tsx
import React from 'react';
import Navbar from '../Navbar';


import Footer from '../Footer';
import AlertasActivas from '../Alertas/AlertasActivas';
import Mapa from './Mapa';


// Componente para la sección de Filtros de Alertas (sidebar izquierdo)
const FiltrosDeAlertas = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Filtros de Alertas</h2>
      <div className="space-y-3">
        <label className="flex items-center text-gray-700">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-red-600 mr-2" defaultChecked />
          Incendios
        </label>
        <label className="flex items-center text-gray-700">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 mr-2" defaultChecked />
          Robos
        </label>
        <label className="flex items-center text-gray-700">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-yellow-600 mr-2" defaultChecked />
          Accidentes
        </label>
      </div>
      {/* Puedes agregar más filtros aquí, como rango de fechas, severidad, etc. */}
    </div>
  );
};




const MapaPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> 
          <div className="lg:col-span-1 flex flex-col gap-6">
            <FiltrosDeAlertas />
            <AlertasActivas />
          </div>

          <div className="lg:col-span-2 flex flex-col"> 
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col max-h-full items-center justify-center">
                 <Mapa />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MapaPage;