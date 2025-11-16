import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { Link } from "react-router-dom";

function BolsoList() {
  const [bolsos, setBolsos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [bolsoAEliminar, setBolsoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const cargarBolsos = () => {
    setLoading(true);
    api.get("/bolsos/all-bolsos")
      .then(response => {
        setBolsos(response.data);
      })
      .catch(error => {
        console.error("Error cargando bolsos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarBolsos();
  }, []);

  const confirmarEliminar = (bolso) => {
    setBolsoAEliminar(bolso);
    setMostrarModalEliminar(true);
  };

  const eliminarBolso = async () => {
    if (!bolsoAEliminar) return;

    setEliminando(true);
    try {
      await api.delete(`/bolsos/eliminar/${bolsoAEliminar.id}`);
      setMostrarModalEliminar(false);
      setBolsoAEliminar(null);
      cargarBolsos();
    } catch (error) {
      console.error("Error eliminando bolso:", error);
      alert("No se pudo eliminar el bolso");
    } finally {
      setEliminando(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-jalesma-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-jalesma-gold mx-auto mb-4"></div>
          <h3 className="text-jalesma-gold-light text-xl">Cargando bolsos...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jalesma-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-jalesma-gold mb-2">
            Listado de Bolsos
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-jalesma-gold to-transparent"></div>
        </div>

        {/* Botón Crear */}
        <div className="flex justify-end mb-6">
          <Link to="/bolsos/crear">
            <button className="bg-jalesma-gold text-jalesma-black px-6 py-3 rounded-lg font-semibold hover:bg-jalesma-gold-light transition-all duration-300 shadow-lg hover:shadow-jalesma-gold/50 transform hover:scale-105">
              + Crear Nuevo Bolso
            </button>
          </Link>
        </div>

        {/* Contenido */}
        {bolsos.length === 0 ? (
          <div className="bg-jalesma-gray-dark rounded-lg p-12 text-center border border-jalesma-gold/20">
            <p className="text-jalesma-gold-light text-lg">No hay bolsos registrados.</p>
          </div>
        ) : (
          <div className="bg-jalesma-gray-dark rounded-lg shadow-2xl overflow-hidden border border-jalesma-gold/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-jalesma-gold-dark to-jalesma-gold text-jalesma-black">
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">ID</th>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Modelo</th>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Marca</th>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Color</th>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Tamaño</th>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Precio</th>
                    <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Materiales</th>
                    <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-jalesma-gold/10">
                  {bolsos.map((bolso) => (
                    <tr 
                      key={bolso.id} 
                      className="hover:bg-jalesma-gray-medium transition-colors duration-200"
                    >
                      <td className="px-4 py-4 text-jalesma-gold-light font-medium text-sm">
                        {bolso.id}
                      </td>
                      <td className="px-4 py-4 text-white font-medium text-sm">
                        {bolso.modelo}
                      </td>
                      <td className="px-4 py-4 text-jalesma-gold-light text-sm">
                        {bolso.marca}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span className="px-2 py-1 bg-jalesma-gold/20 text-jalesma-gold rounded text-xs">
                          {bolso.color}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-jalesma-gold-light text-sm">
                        {bolso.tamanio}
                      </td>
                      <td className="px-4 py-4 text-jalesma-gold font-semibold text-sm">
                        ${bolso.precio}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        {bolso.materiales.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {bolso.materiales.slice(0, 2).map((material, index) => (
                              <span 
                                key={index}
                                className="px-2 py-0.5 bg-blue-900/30 text-blue-300 rounded text-xs"
                              >
                                {material}
                              </span>
                            ))}
                            {bolso.materiales.length > 2 && (
                              <span className="text-gray-500 text-xs">
                                +{bolso.materiales.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500 italic text-xs">Ninguno</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <Link to={`/bolsos/${bolso.id}`}>
                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-xs font-medium">
                              Ver
                            </button>
                          </Link>

                          <Link to={`/bolsos/editar/${bolso.id}`}>
                            <button className="px-3 py-1.5 bg-jalesma-gold text-jalesma-black rounded-md hover:bg-jalesma-gold-light transition-colors duration-200 text-xs font-medium">
                              Editar
                            </button>
                          </Link>

                          <button
                            onClick={() => confirmarEliminar(bolso)}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-xs font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {mostrarModalEliminar && bolsoAEliminar && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-jalesma-gray-dark rounded-lg shadow-2xl border-2 border-red-500/50 max-w-md w-full p-8 transform transition-all">
            
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¿Eliminar Bolso?</h3>
              <p className="text-jalesma-gold-light">
                Esta acción no se puede deshacer. El bolso <span className="text-jalesma-gold font-semibold">{bolsoAEliminar.modelo}</span> será eliminado permanentemente.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setMostrarModalEliminar(false);
                  setBolsoAEliminar(null);
                }}
                disabled={eliminando}
                className="flex-1 py-3 bg-jalesma-gray-medium text-jalesma-gold-light rounded-lg font-semibold hover:bg-jalesma-gray-dark transition-all duration-300 border border-jalesma-gold/20"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarBolso}
                disabled={eliminando}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  eliminando
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-500/50'
                }`}
              >
                {eliminando ? 'Eliminando...' : 'Sí, Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BolsoList