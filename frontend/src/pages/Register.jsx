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
  const [role, setRole] = useState("user"); // 'user' or 'volunteer'
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      if (role === 'admin' && !adminCode.trim()) {
        setError('Admin access code is required');
        return;
      }
      const payload = { name, email, phone, password, role };
      if (role === 'admin') payload.admin_code = adminCode.trim();
      await register(payload);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };
  return (
  <section className="grid lg:grid-cols-2 items-start gap-0 max-w-[1200px] mx-auto py-8 lg:py-12">
      {/* Illustration left */}
      <div className="hidden lg:flex items-start justify-end lg:px-0 pt-0 lg:-mr-px">
        <img
          src={registerImg}
          alt="Register illustration"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>

      {/* Form right */}
      <div className="flex items-center justify-center lg:justify-start pt-0 pb-16 px-6 lg:px-0">
        <div className="w-full max-w-md relative p-6 rounded-xl shadow-soft bg-white/85 backdrop-blur-sm overflow-hidden">
          {/* subtle earth background */}
          <img
            src={regEarth}
            alt="Earth"
            className="pointer-events-none select-none absolute right-0 bottom-0 w-[100%] opacity-50 z-0"
          />
          <div className="relative z-10">
            <div className="mb-2 text-center">
              <h2 className="font-display text-2xl">Join Clean Street</h2>
              <p className="text-gray-600">Be the Change!</p>
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <div>
                <label className="block mb-1 text-sm">Full Name</label>
                <input className="input" type="text" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1 text-sm">Phone Number</label>
                <input className="input" type="tel" placeholder="0000000000" value={phone} onChange={e=>setPhone(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1 text-sm">Role</label>
                <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
                  <option value="user">User</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {role === 'admin' && (
                <div>
                  <label className="block mb-1 text-sm">Admin Access Code</label>
                  <input className="input" type="password" placeholder="Enter admin code" value={adminCode} onChange={e=>setAdminCode(e.target.value)} />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm">Password</label>
                  <input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Confirm Password</label>
                  <input className="input" type="password" placeholder="••••••••" value={confirm} onChange={e=>setConfirm(e.target.value)} />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" />I agree the terms
                and conditions
              </label>

              <button className="btn btn-brand w-full" type="submit">Register</button>
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
