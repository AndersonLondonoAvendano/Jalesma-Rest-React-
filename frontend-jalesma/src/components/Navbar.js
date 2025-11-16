import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <nav className="bg-jalesma-black border-b-2 border-jalesma-gold shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="text-3xl font-bold bg-gradient-to-r from-jalesma-gold via-jalesma-gold-light to-jalesma-gold bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                Jalesma
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/materiales" 
              isActive={isActive('/materiales')}
            >
              Materiales
            </NavLink>
            
            <NavLink 
              to="/marcas" 
              isActive={isActive('/marcas')}
            >
              Marcas
            </NavLink>
            
            <NavLink 
              to="/bolsos" 
              isActive={isActive('/bolsos')}
            >
              Bolsos
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-jalesma-gold hover:text-jalesma-gold-light p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Componente reutilizable para los enlaces
function NavLink({ to, isActive, children }) {
  return (
    <Link
      to={to}
      className={`
        relative px-6 py-2.5 rounded-lg font-medium transition-all duration-300 tracking-wide
        ${isActive 
          ? 'bg-jalesma-gold text-jalesma-black shadow-lg shadow-jalesma-gold/50' 
          : 'text-jalesma-gold-light hover:bg-jalesma-gray-dark hover:text-jalesma-gold'
        }
      `}
    >
      <span>{children}</span>
      
      {/* Efecto de brillo en hover */}
      {!isActive && (
        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-jalesma-gold/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
      )}
    </Link>
  );
}

export default Navbar;