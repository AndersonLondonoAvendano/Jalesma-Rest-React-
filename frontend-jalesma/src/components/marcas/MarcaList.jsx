import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { Link } from "react-router-dom";

function MarcaList() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [marcaAEliminar, setMarcaAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const cargarMarcas = () => {
    setLoading(true);
    api.get("/marcas/all-marcas")
      .then(response => {
        setMarcas(response.data);
      })
      .catch(error => {
        console.error("Error cargando marcas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarMarcas();
  }, []);

  const confirmarEliminar = (marca) => {
    setMarcaAEliminar(marca);
    setMostrarModalEliminar(true);
  };

  const eliminarMarca = async () => {
    if (!marcaAEliminar) return;

    setEliminando(true);
    try {
      await api.delete(`/marcas/eliminar/${marcaAEliminar.id}`);
      setMostrarModalEliminar(false);
      setMarcaAEliminar(null);
      cargarMarcas();
    } catch (error) {
      console.error("Error eliminando marca:", error);
      alert("No se pudo eliminar la marca");
    } finally {
      setEliminando(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-jalesma-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-jalesma-gold mx-auto mb-4"></div>
          <h3 className="text-jalesma-gold-light text-xl">Cargando marcas...</h3>
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
            Listado de Marcas
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-jalesma-gold to-transparent"></div>
        </div>

        {/* Botón Crear */}
        <div className="flex justify-end mb-6">
          <Link to="/marcas/crear">
            <button className="bg-jalesma-gold text-jalesma-black px-6 py-3 rounded-lg font-semibold hover:bg-jalesma-gold-light transition-all duration-300 shadow-lg hover:shadow-jalesma-gold/50 transform hover:scale-105">
              + Crear Nueva Marca
            </button>
          </Link>
        </div>

        {/* Contenido */}
        {marcas.length === 0 ? (
          <div className="bg-jalesma-gray-dark rounded-lg p-12 text-center border border-jalesma-gold/20">
            <p className="text-jalesma-gold-light text-lg">No hay marcas registradas.</p>
          </div>
        ) : (
          <div className="bg-jalesma-gray-dark rounded-lg shadow-2xl overflow-hidden border border-jalesma-gold/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-jalesma-gold-dark to-jalesma-gold text-jalesma-black">
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Bolsos</th>
                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-jalesma-gold/10">
                  {marcas.map((marca) => (
                    <tr 
                      key={marca.id} 
                      className="hover:bg-jalesma-gray-medium transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-jalesma-gold-light font-medium">
                        {marca.id}
                      </td>
                      <td className="px-6 py-4 text-white font-medium">
                        {marca.nombre}
                      </td>
                      <td className="px-6 py-4 text-jalesma-gold-light">
                        {marca.bolsos.length > 0
                          ? marca.bolsos.join(", ")
                          : <span className="text-gray-500 italic">Ninguno</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link to={`/marcas/${marca.id}`}>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                              Ver
                            </button>
                          </Link>

                          <Link to={`/marcas/editar/${marca.id}`}>
                            <button className="px-4 py-2 bg-jalesma-gold text-jalesma-black rounded-md hover:bg-jalesma-gold-light transition-colors duration-200 text-sm font-medium">
                              Editar
                            </button>
                          </Link>

                          <button
                            onClick={() => confirmarEliminar(marca)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
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
      {mostrarModalEliminar && marcaAEliminar && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-jalesma-gray-dark rounded-lg shadow-2xl border-2 border-red-500/50 max-w-md w-full p-8 transform transition-all">
            
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¿Eliminar Marca?</h3>
              <p className="text-jalesma-gold-light">
                Esta acción no se puede deshacer. La marca <span className="text-jalesma-gold font-semibold">{marcaAEliminar.nombre}</span> será eliminada permanentemente.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setMostrarModalEliminar(false);
                  setMarcaAEliminar(null);
                }}
                disabled={eliminando}
                className="flex-1 py-3 bg-jalesma-gray-medium text-jalesma-gold-light rounded-lg font-semibold hover:bg-jalesma-gray-dark transition-all duration-300 border border-jalesma-gold/20"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarMarca}
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

export default MarcaList