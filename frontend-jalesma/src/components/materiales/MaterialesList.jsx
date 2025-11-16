import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { Link } from "react-router-dom";

function MaterialesList() {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/materiales/all-materiales")
      .then(response => {
        setMateriales(response.data);
      })
      .catch(error => {
        console.error("Error cargando materiales:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-jalesma-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-jalesma-gold mx-auto mb-4"></div>
          <h3 className="text-jalesma-gold-light text-xl">Cargando materiales...</h3>
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
            Listado de Materiales
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-jalesma-gold to-transparent"></div>
        </div>

        {/* Botón Crear */}
        <div className="flex justify-end mb-6">
          <Link to="/materiales/crear">
            <button className="bg-jalesma-gold text-jalesma-black px-6 py-3 rounded-lg font-semibold hover:bg-jalesma-gold-light transition-all duration-300 shadow-lg hover:shadow-jalesma-gold/50 transform hover:scale-105">
              + Crear Nuevo Material
            </button>
          </Link>
        </div>

        {/* Contenido */}
        {materiales.length === 0 ? (
          <div className="bg-jalesma-gray-dark rounded-lg p-12 text-center border border-jalesma-gold/20">
            <p className="text-jalesma-gold-light text-lg">No hay materiales registrados.</p>
          </div>
        ) : (
          <div className="bg-jalesma-gray-dark rounded-lg shadow-2xl overflow-hidden border border-jalesma-gold/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-jalesma-gold-dark to-jalesma-gold text-jalesma-black">
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Bolsos</th>
                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-jalesma-gold/10">
                  {materiales.map((material, index) => (
                    <tr 
                      key={material.id} 
                      className="hover:bg-jalesma-gray-medium transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-jalesma-gold-light font-medium">
                        {material.id}
                      </td>
                      <td className="px-6 py-4 text-white font-medium">
                        {material.tipo}
                      </td>
                      <td className="px-6 py-4 text-jalesma-gold font-semibold">
                        ${material.precio}
                      </td>
                      <td className="px-6 py-4 text-jalesma-gold-light">
                        {material.bolsos.length > 0
                          ? material.bolsos.join(", ")
                          : <span className="text-gray-500 italic">Ninguno</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link to={`/materiales/${material.id}`}>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                              Ver
                            </button>
                          </Link>

                          <Link to={`/materiales/editar/${material.id}`}>
                            <button className="px-4 py-2 bg-jalesma-gold text-jalesma-black rounded-md hover:bg-jalesma-gold-light transition-colors duration-200 text-sm font-medium">
                              Editar
                            </button>
                          </Link>

                          <Link to={`/materiales/eliminar/${material.id}`}>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium">
                              Eliminar
                            </button>
                          </Link>
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
    </div>
  );
}

export default MaterialesList;