import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import registerImg from "../assets/register.png";
import regEarth from "../assets/reg_earth.png";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("user"); // 1. Add state for role
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      // 3. Send role on submit
      await register({ name, email, phone, password, role });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="grid lg:grid-cols-2 items-start gap-0 max-w-[1200px] mx-auto py-8 lg:py-12">
      {/* ... (illustration JSX is unchanged) ... */}
      <div className="hidden lg:flex items-start justify-end lg:px-0 pt-0 lg:-mr-px">
        <img
          src={registerImg}
          alt="Register illustration"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>

      <div className="flex items-center justify-center lg:justify-start pt-0 pb-16 px-6 lg:px-0">
        <div className="w-full max-w-md relative p-6 rounded-xl shadow-soft bg-white/85 backdrop-blur-sm overflow-hidden">
          {/* ... (background image JSX is unchanged) ... */}
          <div className="relative z-10">
            <div className="mb-2 text-center">
              <h2 className="font-display text-2xl">Join Clean Street</h2>
              <p className="text-gray-600">Be the Change!</p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <div>
                <label className="block mb-1 text-sm">Full Name</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* 2. Add the dropdown to the form */}
              <div>
                <label className="block mb-1 text-sm">Role</label>
                <select
                  className="input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm">Email</label>
                <input
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Phone Number</label>
                <input
                  className="input"
                  type="tel"
                  placeholder="0000000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm">Password</label>
                  <input
                    className="input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Confirm Password</label>
                  <input
                    className="input"
                    type="password"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* ... (rest of the form is unchanged) ... */}
              <button className="btn btn-brand w-full" type="submit">
                Register
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand-700 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}