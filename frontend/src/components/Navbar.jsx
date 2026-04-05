import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

function getInitials(nameOrEmail = "") {
  if (!nameOrEmail) return "A";
  const base = nameOrEmail.includes("@")
    ? nameOrEmail.split("@")[0]
    : nameOrEmail;
  const parts = base.split(/\s+/).filter(Boolean);
  return parts[0][0].toUpperCase();
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";
  const isVolunteer = user?.role === "volunteer";

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <header className="w-full py-1 border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-gray-900/60 sticky top-0 z-30 backdrop-blur-lg shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between min-h-[72px]">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="CleanStreet logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-display text-2xl tracking-wide">
            CleanStreet
          </span>
        </Link>
        {/* Desktop links (lg and up) */}
        <div className="hidden lg:flex items-center gap-3 text-sm">
          {isLoggedIn && !isAdmin && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full border ${isActive ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`
              }
            >
              🏠 Dashboard
            </NavLink>
          )}
          {isLoggedIn && isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full border ${isActive ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`
              }
            >
              🛡️ Admin
            </NavLink>
          )}
          {isLoggedIn && !isAdmin && (
            <NavLink
              to="/report"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full border ${isActive ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`
              }
            >
              📝 Report Issue
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink
              to="/complaints"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full border ${isActive ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`
              }
            >
              📋 View Complaints
            </NavLink>
          )}
          {isLoggedIn && isVolunteer && (
            <NavLink
              to="/nearby-complaints"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full border ${isActive ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`
              }
            >
              📍 Nearby Complaints
            </NavLink>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 text-xl"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                className="ml-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-2 pr-3 py-1 shadow-sm hover:bg-gray-50 dark:bg-gray-900/80 dark:border-white/20 dark:hover:bg-gray-800/80"
              >
                {user.profile_photo ? (
                  <img
                    src={user.profile_photo}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                    style={{ background: "transparent" }}
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-lg">
                    {getInitials(user.name || user.email)}
                  </span>
                )}
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 max-w-[96px] truncate">
                  {user.name || user.email?.split("@")[0]}
                </span>
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-300"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7L10 12L15 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-gray-900">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.name || "User"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 truncate">
                      {user.email}
                    </div>
                  </div>
                  <div className="py-2 text-sm">
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setProfileOpen(false)}
                    >
                      <span className="text-base">👤</span>
                      <span>My Profile</span>
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 text-left"
                    >
                      <span className="text-base">↩</span>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-brand-500 text-white hover:bg-brand-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            {open ? (
              <path
                fillRule="evenodd"
                d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </button>
      </nav>
      {/* Mobile menu panel */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white dark:bg-gray-900 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 text-sm">
            {isLoggedIn && !isAdmin && (
              <NavLink
                to="/dashboard"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md border ${isActive ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`
                }
              >
                🏠 Dashboard
              </NavLink>
            )}
            {isLoggedIn && isAdmin && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md border ${isActive ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`
                }
              >
                🛡️ Admin
              </NavLink>
            )}
            {isLoggedIn && !isAdmin && (
              <NavLink
                to="/report"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md border ${isActive ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`
                }
              >
                📝 Report Issue
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink
                to="/complaints"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md border ${isActive ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`
                }
              >
                📋 View Complaints
              </NavLink>
            )}
            {isLoggedIn && isVolunteer && (
              <NavLink
                to="/nearby-complaints"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md border ${isActive ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}`
                }
              >
                📍 Nearby Complaints
              </NavLink>
            )}
            <button
              type="button"
              onClick={() => {
                toggleTheme();
              }}
              className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 self-start dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 text-xl"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
            {user ? (
              <div className="flex items-center justify-between gap-3">
                <NavLink
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  {user.profile_photo ? (
                    <img
                      src={user.profile_photo}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                      style={{ background: "transparent" }}
                    />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold text-lg">
                      {getInitials(user.name || user.email)}
                    </span>
                  )}
                  <span className="text-sm">Profile</span>
                </NavLink>
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md bg-brand-600 text-white text-center hover:bg-brand-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md bg-brand-500 text-white text-center hover:bg-brand-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
