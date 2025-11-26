"use client";
import dynamic from 'next/dynamic'; // NECESARIO para cargar recharts solo en el cliente
import { useEffect, useState } from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';

// 1. Definición de la estructura de datos (para TypeScript)
interface Alert {
    id: string;
    title: string;
    description: string;
    alertType: string;
    status: string;
    createdAt: { _seconds: number };
}

// 2. Colores para la gráfica
const COLORS: { [key: string]: string } = {
    'Incendio': '#EF4444', // red-500
    'Robo': '#3B82F6',     // blue-500
    'Accidente': '#F59E0B', // orange-400
    'Otro': '#6B7280'
};

// 3. Importación dinámica del componente de gráfica
// Esto resuelve los errores de SSR al usar librerías que dependen del navegador (como recharts).
const ChartWrapper = dynamic(() => import('recharts').then((mod) => {
    const { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } = mod;
    
    // El componente interno que recibe los props y renderiza la gráfica
    return ({ data, COLORS, total }: { data: { name: string; value: number }[], COLORS: any, total: number }) => (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS['Otro']} />
                    ))}
                </Pie>
                <Tooltip 
                    // Formatea el Tooltip para mostrar el porcentaje
                    formatter={(value: any, name: any) => [`${value} (${Math.round((value / total) * 100)}%)`, name]}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}), {
    ssr: false, // CLAVE: No renderizar en el servidor
    loading: () => <div className="text-center py-10">Cargando gráfica...</div>
});


const EstadisticasPage = () => {
    // 4. Estados para la lógica del componente
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ 
        active: 0, 
        total: 0, 
        distribution: [] as { name: string; value: number }[] 
    });
    const [error, setError] = useState<string | null>(null);

    // Función para calcular las métricas
    const calculateStats = (alertsList: Alert[]) => {
        const total = alertsList.length;
        const active = alertsList.filter(a => a.status === 'En Proceso').length;

        const distributionMap = alertsList.reduce((acc: { [key: string]: number }, alert) => {
            const type = alert.alertType || 'Otro'; 
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        const distributionArray = Object.keys(distributionMap).map(key => ({ 
            name: key, 
            value: distributionMap[key] 
        }));

        setStats({ active, total, distribution: distributionArray });
    };


    // 5. useEffect para el Fetch
    useEffect(() => {
        // Asegúrate de que Django esté corriendo en este puerto
        fetch('https://quicksosbackend-production.up.railway.app/api/alerts/') 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`La conexión al servidor de Django falló. Código: ${response.status}`);
                }
                return response.json();
            })
            .then((data: Alert[]) => {
                setAlerts(data);
                calculateStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al obtener datos:", err);
                setError("Fallo la carga de datos del backend.");
                setLoading(false);
            });
    }, []); 

    // Manejo de estado de carga y error
    if (loading) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-600">Cargando estadísticas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
                <p className="text-xl text-red-600">Error: No se pudieron cargar los datos del backend. ({error})</p>
                <p className="text-sm text-gray-500 mt-2">Asegúrate de que Django esté corriendo y no haya problemas de CORS.</p>
            </div>
        );
    }
    
    // 6. Retorno del componente con renderizado dinámico
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar /> 

            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Estadísticas</h1>

                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6"> 
                    {/* COLUMNA IZQUIERDA */}
                    <div className=' grid grid-cols-1 gap-6 '>

                        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
                            {/* CARD 1: ALERTAS ACTIVAS (DINÁMICO) */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center-safe">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Alertas Activas</p>
                                    <p className="text-3xl font-bold text-red-600">{stats.active}</p>
                                    <p className="text-sm text-green-500">+2.4% vs mes anterior</p>
                                </div>
                                <span className="text-red-500 text-3xl">⚠️</span> 
                            </div>
                            
                            {/* CARD 2: TOTAL INCIDENTES (DINÁMICO) */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-evenly">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Total Incidentes</p>
                                    <p className="text-3xl font-bold text-yellow-600">{stats.total}</p>
                                    <p className="text-sm text-red-500">-1.5% vs mes anterior</p>
                                </div>
                                <span className="text-yellow-500 text-3xl">📊</span> 
                            </div>
                        </div> 
                        
                        {/* GRÁFICA DE DISTRIBUCIÓN (USANDO CHARTWRAPPER DINÁMICO) */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Distribución por Tipo</h2>

                            <div className="h-64 flex items-center justify-center text-gray-400">
                                {/* Componente de gráfica dinámico */}
                                <ChartWrapper 
                                    data={stats.distribution} 
                                    COLORS={COLORS} 
                                    total={stats.total}
                                />
                            </div>
                            <div className="flex justify-center mt-4 space-x-4 text-sm text-black">
                                {/* Leyenda dinámica */}
                                {stats.distribution.map((entry, index) => (
                                    <span key={index} className="flex items-center">
                                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[entry.name] || COLORS['Otro'] }}></span>
                                        {entry.name} ({Math.round((entry.value / stats.total) * 100)}%)
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>


                    {/* COLUMNA DERECHA: TABLA DETALLADA (DINÁMICO) */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Estadísticas Detalladas</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {alerts.map((alert, index) => (
                                        <tr key={alert.id || index}>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${alert.alertType === 'Incendio' ? 'text-red-600' : alert.alertType === 'Robo' ? 'text-blue-600' : 'text-yellow-600'}`}>
                                                {alert.alertType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">
                                                {alert.description.substring(0, 40)}...
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(alert.createdAt._seconds * 1000).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${alert.status === 'Resuelto' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {alert.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EstadisticasPage;