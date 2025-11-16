import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

function DetalleBolso() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bolso, setBolso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eliminando, setEliminando] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  useEffect(() => {
    api.get(`/bolsos/${id}`)
      .then(response => {
        setBolso(response.data);
      })
      .catch(error => {
        console.error("Error cargando bolso:", error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEliminar = async () => {
    setEliminando(true);
    try {
      await api.delete(`/bolsos/eliminar/${id}`);
      navigate("/bolsos");
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("Error al eliminar el bolso");
      setEliminando(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-jalesma-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-jalesma-gold mx-auto mb-4"></div>
          <h3 className="text-jalesma-gold-light text-xl">Cargando bolso...</h3>
        </div>
      </div>
    );
  }

  if (!bolso) {
    return (
      <div className="min-h-screen bg-jalesma-black flex items-center justify-center px-4">
        <div className="text-center">
          <h3 className="text-2xl text-jalesma-gold-light mb-4">No se encontró el bolso</h3>
          <Link 
            to="/bolsos"
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
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/bolsos" 
            className="text-jalesma-gold hover:text-jalesma-gold-light transition-colors duration-200 inline-flex items-center mb-4"
          >
            ← Volver al listado
          </Link>
          <h2 className="text-4xl font-bold text-jalesma-gold mb-2">
            Detalle del Bolso
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-jalesma-gold to-transparent"></div>
        </div>

        {/* Contenido Principal */}
        <div className="bg-jalesma-gray-dark rounded-lg shadow-2xl border border-jalesma-gold/30 overflow-hidden">
          
          {/* Información del Bolso */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* ID */}
              <div className="bg-jalesma-gray-medium rounded-lg p-6 border border-jalesma-gold/10">
                <p className="text-jalesma-gold-light/60 text-sm mb-2 uppercase tracking-wider">ID</p>
                <p className="text-jalesma-gold text-2xl font-bold">#{bolso.id}</p>
              </div>

              {/* Modelo */}
              <div className="bg-jalesma-gray-medium rounded-lg p-6 border border-jalesma-gold/10 lg:col-span-2">
                <p className="text-jalesma-gold-light/60 text-sm mb-2 uppercase tracking-wider">Modelo</p>
                <p className="text-white text-2xl font-semibold">{bolso.modelo}</p>
              </div>

              {/* Marca */}
              <div className="bg-jalesma-gray-medium rounded-lg p-6 border border-jalesma-gold/10">
                <p className="text-jalesma-gold-light/60 text-sm mb-2 uppercase tracking-wider">Marca</p>
                <p className="text-jalesma-gold-light text-xl font-medium">{bolso.marca}</p>
              </div>

              {/* Color */}
              <div className="bg-jalesma-gray-medium rounded-lg p-6 border border-jalesma-gold/10">
                <p className="text-jalesma-gold-light/60 text-sm mb-2 uppercase tracking-wider">Color</p>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-jalesma-gold/20 text-jalesma-gold rounded-lg text-lg font-medium border border-jalesma-gold/30">
                    {bolso.color || "Sin especificar"}
                  </span>
                </div>
              </div>

              {/* Tamaño */}
              <div className="bg-jalesma-gray-medium rounded-lg p-6 border border-jalesma-gold/10">
                <p className="text-jalesma-gold-light/60 text-sm mb-2 uppercase tracking-wider">Tamaño</p>
                <p className="text-white text-xl font-medium">{bolso.tamanio || "Sin especificar"}</p>
              </div>

              {/* Precio */}
              <div className="bg-gradient-to-br from-jalesma-gold-dark to-jalesma-gold rounded-lg p-6 border-2 border-jalesma-gold shadow-lg md:col-span-2 lg:col-span-3">
                <p className="text-jalesma-black/70 text-sm mb-2 uppercase tracking-wider font-bold">Precio</p>
                <p className="text-jalesma-black text-4xl font-bold">${bolso.precio}</p>
              </div>

              {/* Materiales */}
              <div className="bg-jalesma-gray-medium rounded-lg p-6 border border-jalesma-gold/10 md:col-span-2 lg:col-span-3">
                <p className="text-jalesma-gold-light/60 text-sm mb-3 uppercase tracking-wider">
                  Materiales Utilizados
                </p>
                {bolso.materiales.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {bolso.materiales.map((material, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30 hover:bg-blue-900/50 transition-colors"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No hay materiales registrados</p>
                )}
              </div>

            </div>
          </div>

          {/* Acciones */}
          <div className="bg-jalesma-gray-medium px-8 py-6 border-t border-jalesma-gold/10">
            <div className="flex flex-wrap gap-4">
              
              <Link 
                to={`/bolsos/editar/${bolso.id}`}
                className="flex-1 min-w-[200px] py-3 bg-jalesma-gold text-jalesma-black rounded-lg font-semibold hover:bg-jalesma-gold-light transition-all duration-300 text-center shadow-lg hover:shadow-jalesma-gold/50 transform hover:scale-105"
              >
                Editar Bolso
              </Link>

              <button
                onClick={() => setMostrarModalEliminar(true)}
                className="flex-1 min-w-[200px] py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
              >
                Eliminar Bolso
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
              <h3 className="text-2xl font-bold text-white mb-2">¿Eliminar Bolso?</h3>
              <p className="text-jalesma-gold-light">
                Esta acción no se puede deshacer. El bolso <span className="text-jalesma-gold font-semibold">{bolso.modelo}</span> será eliminado permanentemente.
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

export default DetalleBolso;