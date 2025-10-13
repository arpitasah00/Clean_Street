import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <header className="w-full py-3 border-b border-gray-100 bg-white sticky top-0 z-10 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">💡</span>
          <span className="font-display text-2xl tracking-wide">CleanStreet</span>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <NavLink to="/dashboard" className={({isActive}) => `px-4 py-2 rounded-full border ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}>🏠 Dashboard</NavLink>
          <NavLink to="/report" className={({isActive}) => `px-4 py-2 rounded-full border ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}>📝 Report Issue</NavLink>
          <NavLink to="/complaints" className={({isActive}) => `px-4 py-2 rounded-full border ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 hover:bg-gray-50'}`}>📋 View Complaints</NavLink>
          {user ? (
            <>
              <NavLink to="/profile" className={({isActive}) => `px-4 py-2 rounded-full ${isActive ? 'bg-brand-600 text-white' : 'bg-brand-500 text-white hover:bg-brand-600'}`}>{user.name || 'Profile'}</NavLink>
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