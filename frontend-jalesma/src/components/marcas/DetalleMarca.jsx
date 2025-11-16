import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

function DetalleMarca() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marca, setMarca] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eliminando, setEliminando] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  useEffect(() => {
    api.get(`/marcas/${id}`)
      .then(response => {
        setMarca(response.data);
      })
      .catch(error => {
        console.error("Error cargando marca:", error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEliminar = async () => {
    setEliminando(true);
    try {
      await api.delete(`/marcas/eliminar/${id}`);
      navigate("/marcas");
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("Error al eliminar la marca");
      setEliminando(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-jalesma-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-jalesma-gold mx-auto mb-4"></div>
          <h3 className="text-jalesma-gold-light text-xl">Cargando marca...</h3>
        </div>
      </div>
    );
  }

  if (!marca) {
    return (
      <div className="min-h-screen bg-jalesma-black flex items-center justify-center px-4">
        <div className="text-center">
          <h3 className="text-2xl text-jalesma-gold-light mb-4">No se encontró la marca</h3>
          <Link 
            to="/marcas"
            className="text-jalesma-gold hover:text-jalesma-gold-light transition-colors"
          >
            ← Volver al listado
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jalesma-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/marcas" 
            className="text-jalesma-gold hover:text-jalesma-gold-light transition-colors duration-200 inline-flex items-center mb-4"
          >
            ← Volver al listado
          </Link>
          <h2 className="text-4xl font-bold text-jalesma-gold mb-2">
            Detalle de la Marca
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-jalesma-gold to-transparent"></div>
        </div>

        {/* Contenido Principal */}
        <div className="bg-jalesma-gray-dark rounded-lg shadow-2xl border border-jalesma-gold/30 overflow-hidden">
          
          {/* Información de la Marca */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* ID */}
              <div className="bg-jalesma-gray-medium rounded-lg p-6 border border-jalesma-gold/10">
                <p className="text-jalesma-gold-light/60 text-sm mb-2 uppercase tracking-wider">ID</p>
                <p className="text-jalesma-gold text-2xl font-bold">#{marca.id}</p>
              </div>

              {/* Nombre */}
              <div className="bg-jalesma-gray-medium rounded-lg p-6 border border-jalesma-gold/10">
                <p className="text-jalesma-gold-light/60 text-sm mb-2 uppercase tracking-wider">Nombre</p>
                <p className="text-white text-2xl font-semibold">{marca.nombre}</p>
              </div>

              {/* Bolsos Asociados */}
              <div className="bg-jalesma-gray-medium rounded-lg p-6 border border-jalesma-gold/10 md:col-span-2">
                <p className="text-jalesma-gold-light/60 text-sm mb-2 uppercase tracking-wider">
                  Bolsos Asociados
                </p>
                {marca.bolsos.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {marca.bolsos.map((bolso, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-jalesma-gold/20 text-jalesma-gold rounded-full text-sm border border-jalesma-gold/30"
                      >
                        {bolso}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic mt-2">No hay bolsos asociados</p>
                )}
              </div>

            </div>
          </div>

          {/* Acciones */}
          <div className="bg-jalesma-gray-medium px-8 py-6 border-t border-jalesma-gold/10">
            <div className="flex flex-wrap gap-4">
              
              <Link 
                to={`/marcas/editar/${marca.id}`}
                className="flex-1 min-w-[200px] py-3 bg-jalesma-gold text-jalesma-black rounded-lg font-semibold hover:bg-jalesma-gold-light transition-all duration-300 text-center shadow-lg hover:shadow-jalesma-gold/50 transform hover:scale-105"
              >
                Editar Marca
              </Link>

              <button
                onClick={() => setMostrarModalEliminar(true)}
                className="flex-1 min-w-[200px] py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
              >
                Eliminar Marca
              </button>

            </div>
          </div>
        </div>

      </div>

      {/* Modal de Confirmación de Eliminación */}
      {mostrarModalEliminar && (
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
                Esta acción no se puede deshacer. La marca <span className="text-jalesma-gold font-semibold">{marca.nombre}</span> será eliminada permanentemente.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setMostrarModalEliminar(false)}
                disabled={eliminando}
                className="flex-1 py-3 bg-jalesma-gray-medium text-jalesma-gold-light rounded-lg font-semibold hover:bg-jalesma-gray-dark transition-all duration-300 border border-jalesma-gold/20"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
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

export default DetalleMarca;