import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'

function getInitials(nameOrEmail = '') {
  if (!nameOrEmail) return 'A';
  const base = nameOrEmail.includes('@') ? nameOrEmail.split('@')[0] : nameOrEmail;
  const parts = base.split(/\s+/).filter(Boolean);
  return parts[0][0].toUpperCase();
}

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <header className="w-full py-3 border-b border-gray-100 bg-white sticky top-0 z-10 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CleanStreet logo" className="w-8 h-8 object-contain" />
          <span className="font-display text-2xl tracking-wide">CleanStreet</span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          {user?.role !== 'admin' && (
            <NavLink to="/dashboard" className={({isActive}) => `px-4 py-2 rounded-full border ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}>🏠 Dashboard</NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({isActive}) => `px-4 py-2 rounded-full border ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}>🛡️ Admin</NavLink>
          )}
          {user?.role !== 'admin' && (
            <NavLink to="/report" className={({isActive}) => `px-4 py-2 rounded-full border ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}>📝 Report Issue</NavLink>
          )}
          <NavLink to="/complaints" className={({isActive}) => `px-4 py-2 rounded-full border ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}>📋 View Complaints</NavLink>
          {user ? (
            <>
              <NavLink to="/profile" className="px-2 py-2 rounded-full flex items-center">
                {user.profile_photo ? (
                  <img src={user.profile_photo} alt="avatar" className="w-8 h-8 rounded-full object-cover" style={{background: 'transparent'}} />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold text-lg">
                    {getInitials(user.name || user.email)}
                  </span>
                )}
              </NavLink>
              <button onClick={logout} className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-full bg-brand-500 text-white hover:bg-brand-600">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
