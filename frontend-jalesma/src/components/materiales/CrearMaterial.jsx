import React, { useState } from "react";
import api from "../../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

function CrearMaterial() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tipo: "",
    precio: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'success' o 'error'
  const [guardando, setGuardando] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
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
      const response = await api.post("/materiales/crear", form);
      console.log("Material creado:", response.data);

      setMensaje("Material creado exitosamente");
      setTipoMensaje("success");

      // Redirigir al listado luego de 1.5 segundos
      setTimeout(() => navigate("/materiales"), 1500);

    } catch (error) {
      console.error("Error creando material:", error);
      setMensaje(error.response?.data?.message || "Error al crear el material");
      setTipoMensaje("error");
      setGuardando(false);
    }
  };

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
            Crear Nuevo Material
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
              <p className="text-jalesma-gold-light/60 text-sm mt-1">
                Ingresa el tipo o nombre del material
              </p>
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
                  min="0.01"
                  className="w-full pl-10 pr-4 py-3 bg-jalesma-gray-medium border border-jalesma-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-jalesma-gold focus:ring-2 focus:ring-jalesma-gold/50 transition-all duration-200"
                />
              </div>
              <p className="text-jalesma-gold-light/60 text-sm mt-1">
                Precio unitario del material
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
                {guardando ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </span>
                ) : (
                  'Crear Material'
                )}
              </button>

              <Link 
                to="/materiales"
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

export default CrearMaterial