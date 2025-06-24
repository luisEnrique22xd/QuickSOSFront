interface Alerta {
  id: string;
  tipo: 'Incendio' | 'Robo' | 'Accidente';
  ubicacion: string;
  severidad: 'Alta' | 'Media' | 'Baja';
  hora: string;
}

const alertas: Alerta[] = [
  { id: '1', tipo: 'Incendio', ubicacion: 'Av. Principal 123', severidad: 'Alta', hora: '10:30' },
  { id: '2', tipo: 'Robo', ubicacion: 'Plaza Central', severidad: 'Media', hora: '11:15' },
  { id: '3', tipo: 'Accidente', ubicacion: 'Calle 45 Norte', severidad: 'Alta', hora: '09:45' },
];

const Alertas = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-black">Alertas Activas</h2>
      <div className="flex space-x-4 mb-4">

        <button className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm cursor-pointer">Incendios</button>
        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer">Robos</button>
        <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm cursor-pointer">Accidentes</button>
      </div>

      <div className="">
        {alertas.map((alerta) => (
          <div key={alerta.id} className="border-b border-gray-300 py-3 last:border-b-0">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800 flex items-center">
                {alerta.tipo === 'Incendio' && <span className="text-red-500 mr-2">🔥</span>}
                {alerta.tipo === 'Robo' && <span className="text-blue-500 mr-2">🚨</span>}
                {alerta.tipo === 'Accidente' && <span className="text-yellow-500 mr-2">⚠️</span>}
                {alerta.tipo}
              </h3>
              <span className="text-gray-500 text-sm">{alerta.hora}</span>
            </div>
            <p className="text-gray-600 text-sm">{alerta.ubicacion}</p>
            <p className="text-gray-500 text-xs">Severidad: <span className={`${alerta.severidad === 'Alta' ? 'text-red-600 font-semibold' : ''}`}>{alerta.severidad}</span></p>
            <button className="text-blue-500 text-sm mt-1 hover:underline">Ver Detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alertas;