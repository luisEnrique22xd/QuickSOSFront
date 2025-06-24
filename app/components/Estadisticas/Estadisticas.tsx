const Estadisticas = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">

          <span className="text-gray-500 text-2xl">🔔</span>
          <div>
            <p className="text-gray-700">Alertas Activas</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-2xl">📄</span>
          <div>
            <p className="text-gray-700">Total Incidentes</p>
            <p className="text-2xl font-bold text-gray-900">45</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Estadisticas;