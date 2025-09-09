import Navbar from '../Navbar'; 
import Footer from '../Footer';



const EstadisticasPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> 

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Estadísticas</h1>

<div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 contain-content mx auto"> 

      <div className=' flex-grow contain-content mx auto grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 '>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10 ">
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center-safe">
            <div>
              <p className="text-gray-500 text-sm font-medium">Alertas Activas</p>
              <p className="text-3xl font-bold text-red-600">12</p>
              <p className="text-sm text-green-500">+2.4% vs mes anterior</p>
            </div>
            <span className="text-red-500 text-3xl">⚠️</span> 
          </div>

        

         
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-evenly">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Incidentes</p>
              <p className="text-3xl font-bold text-yellow-600">45</p>
              <p className="text-sm text-red-500">-1.5% vs mes anterior</p>
            </div>
            <span className="text-yellow-500 text-3xl">📊</span> 
          </div>
        </div> 

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Distribución por Tipo</h2>

            <div className="h-64 bg-gray-50 flex items-center justify-center text-gray-400">
              [aqui la grafica de porcentaje]
            </div>
            <div className="flex justify-center mt-4 space-x-4 text-sm text-black">
              <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>Incendios</span>
              <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>Robos</span>
              <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-orange-400 mr-2"></span>Accidentes</span>
            </div>
          </div>

       </div>


        

          
    
          <div className="bg-white p-6 rounded-lg shadow-md items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Estadísticas Detalladas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">Incendio</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Av. Principal 123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/01/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Resuelto
                      Detalles por árte de las autoridades
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">Robo</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Plaza Central</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/01/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Resuelto</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-600">Accidente</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Calle 45 Norte</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/01/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Resuelto</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">Incendio</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Calle Sur 67</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14/01/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">En Proceso</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">Robo</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Av. Libertad</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14/01/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">En Proceso</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>            


        </div>
</div>
      </main>

      <Footer />
    </div>
  );
};

export default EstadisticasPage;