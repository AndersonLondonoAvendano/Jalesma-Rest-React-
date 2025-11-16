import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/axiosConfig";

function EditarBolso() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    modelo: "",
    marca: "",
    color: "",
    tamanio: "",
    precio: "",
    materiales: []
  });

  const [marcas, setMarcas] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get(`/bolsos/${id}`),
      api.get("/marcas/all-marcas"),
      api.get("/materiales/all-materiales")
    ])
      .then(([bolsoRes, marcasRes, materialesRes]) => {
        setForm(bolsoRes.data);
        setMarcas(marcasRes.data);
        setMateriales(materialesRes.data);
      })
      .catch(err => {
        console.error("Error cargando datos:", err);
        setMensaje("Error al cargar el bolso");
        setTipoMensaje("error");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMensaje("");
  };

  const toggleMaterial = (tipo) => {
    setForm(prev => ({
      ...prev,
      materiales: prev.materiales.includes(tipo)
        ? prev.materiales.filter(m => m !== tipo)
        : [...prev.materiales, tipo]
    }));
  };

  const editar = async (e) => {
    e.preventDefault();
    setMensaje("");
    setGuardando(true);

    // Validaciones
    if (!form.modelo.trim()) {
      setMensaje("El modelo es requerido");
      setTipoMensaje("error");
      setGuardando(false);
      return;
    }

    if (!form.marca) {
      setMensaje("Debe seleccionar una marca");
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
      await api.put(`/bolsos/editar/${id}`, form);
      setMensaje("Bolso actualizado exitosamente");
      setTipoMensaje("success");
      
      setTimeout(() => navigate(`/bolsos/${id}`), 1500);

    } catch (err) {
      console.error(err);
      setMensaje(err.response?.data?.message || "Error al actualizar el bolso");
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
          <h3 className="text-jalesma-gold-light text-xl">Cargando bolso...</h3>
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
            to="/bolsos" 
            className="text-jalesma-gold hover:text-jalesma-gold-light transition-colors duration-200 inline-flex items-center mb-4"
          >
            ← Volver al listado
          </Link>
          <h2 className="text-4xl font-bold text-jalesma-gold mb-2">
            Editar Bolso
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-jalesma-gold to-transparent"></div>
        </div>

        {/* Formulario */}
        <div className="bg-jalesma-gray-dark rounded-lg shadow-2xl p-8 border border-jalesma-gold/30">
          <form onSubmit={editar} className="space-y-6">
            
            {/* Grid de 2 columnas para campos principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Modelo */}
              <div>
                <label htmlFor="modelo" className="block text-jalesma-gold-light font-medium mb-2">
                  Modelo <span className="text-red-500">*</span>
                </label>
                <input
                  id="modelo"
                  type="text"
                  name="modelo"
                  value={form.modelo}
                  onChange={handleChange}
                  placeholder="Ej: Classic Flap, Speedy 30..."
                  className="w-full px-4 py-3 bg-jalesma-gray-medium border border-jalesma-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-jalesma-gold focus:ring-2 focus:ring-jalesma-gold/50 transition-all duration-200"
                />
              </div>

              {/* Marca */}
              <div>
                <label htmlFor="marca" className="block text-jalesma-gold-light font-medium mb-2">
                  Marca <span className="text-red-500">*</span>
                </label>
                <select
                  id="marca"
                  name="marca"
                  value={form.marca}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-jalesma-gray-medium border border-jalesma-gold/20 rounded-lg text-white focus:outline-none focus:border-jalesma-gold focus:ring-2 focus:ring-jalesma-gold/50 transition-all duration-200"
                >
                  <option value="">Seleccione una marca...</option>
                  {marcas.map(m => (
                    <option key={m.id} value={m.nombre}>{m.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div>
                <label htmlFor="color" className="block text-jalesma-gold-light font-medium mb-2">
                  Color
                </label>
                <input
                  id="color"
                  type="text"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  placeholder="Ej: Negro, Beige, Rojo..."
                  className="w-full px-4 py-3 bg-jalesma-gray-medium border border-jalesma-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-jalesma-gold focus:ring-2 focus:ring-jalesma-gold/50 transition-all duration-200"
                />
              </div>

              {/* Tamaño */}
              <div>
                <label htmlFor="tamanio" className="block text-jalesma-gold-light font-medium mb-2">
                  Tamaño
                </label>
                <input
                  id="tamanio"
                  type="text"
                  name="tamanio"
                  value={form.tamanio}
                  onChange={handleChange}
                  placeholder="Ej: Pequeño, Mediano, Grande..."
                  className="w-full px-4 py-3 bg-jalesma-gray-medium border border-jalesma-gold/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-jalesma-gold focus:ring-2 focus:ring-jalesma-gold/50 transition-all duration-200"
                />
              </div>

            </div>

            {/* Precio (ancho completo) */}
            <div>
              <label htmlFor="precio" className="block text-jalesma-gold-light font-medium mb-2">
                Precio <span className="text-red-500">*</span>
              </label>
              <div className="relative max-w-xs">
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
            </div>

            {/* Materiales */}
            <div>
              <label className="block text-jalesma-gold-light font-medium mb-3">
                Materiales
              </label>
              <div className="bg-jalesma-gray-medium border border-jalesma-gold/20 rounded-lg p-4">
                {materiales.length === 0 ? (
                  <p className="text-gray-500 italic text-sm">No hay materiales disponibles</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {materiales.map(mat => (
                      <label
                        key={mat.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-jalesma-gray-dark transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={form.materiales.includes(mat.tipo)}
                          onChange={() => toggleMaterial(mat.tipo)}
                          className="w-4 h-4 text-jalesma-gold bg-jalesma-gray-dark border-jalesma-gold/30 rounded focus:ring-2 focus:ring-jalesma-gold/50"
                        />
                        <span className="text-white text-sm">{mat.tipo}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {form.materiales.length > 0 && (
                <p className="text-jalesma-gold-light/60 text-sm mt-2">
                  {form.materiales.length} material(es) seleccionado(s)
                </p>
              )}
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
                to={`/bolsos/${id}`}
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

export default EditarBolso;