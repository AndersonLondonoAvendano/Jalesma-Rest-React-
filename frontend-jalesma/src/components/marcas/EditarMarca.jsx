import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditarMarca() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    api.get(`/marcas/${id}`)
      .then(res => {
        setNombre(res.data.nombre);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMensaje("Error al cargar la marca");
        setTipoMensaje("error");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setNombre(e.target.value);
    setMensaje(""); // Limpiar mensaje al escribir
  };

  const editarMarca = async (e) => {
    e.preventDefault();
    setMensaje("");
    setGuardando(true);

    // Validación básica
    if (!nombre.trim()) {
      setMensaje("El nombre de la marca es requerido");
      setTipoMensaje("error");
      setGuardando(false);
      return;
    }

    try {
      await api.put(`/marcas/editar/${id}`, { nombre });
      setMensaje("Marca actualizada exitosamente");
      setTipoMensaje("success");
      
      setTimeout(() => navigate(`/marcas/${id}`), 1500);

    } catch (err) {
      console.error(err);
      setMensaje("Error al actualizar la marca");
      setTipoMensaje("error");
    } finally {
      setGuardando(false);
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

  return (
    <div className="min-h-screen bg-jalesma-black py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/marcas" 
            className="text-jalesma-gold hover:text-jalesma-gold-light transition-colors duration-200 inline-flex items-center mb-4"
          >
            ← Volver al listado
          </Link>
          <h2 className="text-4xl font-bold text-jalesma-gold mb-2">
            Editar Marca
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-jalesma-gold to-transparent"></div>
        </div>

        {/* Formulario */}
        <div className="bg-jalesma-gray-dark rounded-lg shadow-2xl p-8 border border-jalesma-gold/30">
          <form onSubmit={editarMarca} className="space-y-6">
            
            {/* Campo Nombre */}
            <div>
              <label 
                htmlFor="nombre" 
                className="block text-jalesma-gold-light font-medium mb-2"
              >
                Nombre de la Marca <span className="text-red-500">*</span>
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={handleChange}
                placeholder="Ej: Gucci, Louis Vuitton, Prada..."
                className="w-full px-4 py-3 bg-jalesma-gray-medium border border-jalesma-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-jalesma-gold focus:ring-2 focus:ring-jalesma-gold/50 transition-all duration-200"
              />
              <p className="text-jalesma-gold-light/60 text-sm mt-1">
                Ingresa el nombre de la marca
              </p>
            </div>

            {/* Mensaje de feedback */}
            {mensaje && (
              <div 
                className={`p-4 rounded-lg border ${
                  tipoMensaje === 'success' 
                    ? 'bg-green-900/20 border-green-500/50 text-green-400' 
                    : 'bg-red-900/20 border-red-500/50 text-red-400'
                }`}
              >
                <div className="flex items-center">
                  {tipoMensaje === 'success' ? (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  {mensaje}
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={guardando}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  guardando
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-jalesma-gold text-jalesma-black hover:bg-jalesma-gold-light shadow-lg hover:shadow-jalesma-gold/50 transform hover:scale-105'
                }`}
              >
                {guardando ? 'Guardando...' : 'Guardar Cambios'}
              </button>

              <Link 
                to={`/marcas/${id}`}
                className="flex-1 py-3 bg-jalesma-gray-medium text-jalesma-gold-light rounded-lg font-semibold hover:bg-jalesma-gray-dark transition-all duration-300 text-center border border-jalesma-gold/20"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>

        {/* Info adicional */}
        <div className="mt-6 text-center text-jalesma-gold-light/60 text-sm">
          Los campos marcados con <span className="text-red-500">*</span> son obligatorios
        </div>
      </div>
    </div>
  );
}

export default EditarMarca;