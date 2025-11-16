import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/axiosConfig";

function EditarMaterial() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tipo: "",
    precio: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'success' o 'error'
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    api.get(`/materiales/${id}`)
      .then(response => {
        setForm({
          tipo: response.data.tipo,
          precio: response.data.precio
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("Error cargando material:", error);
        setMensaje("Error al cargar el material");
        setTipoMensaje("error");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMensaje(""); // Limpiar mensaje al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setGuardando(true);

    // Validación básica
    if (!form.tipo.trim()) {
      setMensaje("El tipo de material es requerido");
      setTipoMensaje("error");
      setGuardando(false);
      return;
    }

    if (!form.precio || form.precio <= 0) {
      setMensaje("El precio debe ser mayor a 0");
      setTipoMensaje("error");
      setGuardando(false);
      return;
    }

    try {
      await api.put(`/materiales/editar/${id}`, form);
      setMensaje("Material actualizado exitosamente");
      setTipoMensaje("success");
      
      setTimeout(() => navigate(`/materiales/${id}`), 1500);

    } catch (error) {
      console.error("Error actualizando:", error);
      setMensaje("Error al actualizar el material");
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
          <h3 className="text-jalesma-gold-light text-xl">Cargando material...</h3>
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
            to="/materiales" 
            className="text-jalesma-gold hover:text-jalesma-gold-light transition-colors duration-200 inline-flex items-center mb-4"
          >
            ← Volver al listado
          </Link>
          <h2 className="text-4xl font-bold text-jalesma-gold mb-2">
            Editar Material
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-jalesma-gold to-transparent"></div>
        </div>

        {/* Formulario */}
        <div className="bg-jalesma-gray-dark rounded-lg shadow-2xl p-8 border border-jalesma-gold/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo Tipo */}
            <div>
              <label 
                htmlFor="tipo" 
                className="block text-jalesma-gold-light font-medium mb-2"
              >
                Tipo de Material <span className="text-red-500">*</span>
              </label>
              <input
                id="tipo"
                type="text"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                placeholder="Ej: Cuero, Tela, Sintético..."
                className="w-full px-4 py-3 bg-jalesma-gray-medium border border-jalesma-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-jalesma-gold focus:ring-2 focus:ring-jalesma-gold/50 transition-all duration-200"
              />
            </div>

            {/* Campo Precio */}
            <div>
              <label 
                htmlFor="precio" 
                className="block text-jalesma-gold-light font-medium mb-2"
              >
                Precio <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-jalesma-gold font-semibold">$</span>
                <input
                  id="precio"
                  type="number"
                  name="precio"
                  value={form.precio}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 bg-jalesma-gray-medium border border-jalesma-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-jalesma-gold focus:ring-2 focus:ring-jalesma-gold/50 transition-all duration-200"
                />
              </div>
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
                {mensaje}
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
                to={`/materiales/${id}`}
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

export default EditarMaterial;