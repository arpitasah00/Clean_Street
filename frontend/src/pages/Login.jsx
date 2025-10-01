import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import loginImg from "../assets/login.jpg";
import lamp from "../assets/lamp.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <section className="grid lg:grid-cols-2 items-start gap-0 lg:gap-x-2 max-w-[1200px] mx-auto py-8 lg:py-12">
      {/* Illustration */}
      <div className="hidden lg:flex items-start justify-end lg:px-0 pt-0">
        <img
          src={loginImg}
          alt="Clean Street illustration"
          className="w-full max-w-[32rem] lg:w-[32rem] h-auto object-contain"
        />
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center lg:justify-start pt-0 pb-8 px-6 lg:px-0">
        <div className="w-full max-w-[28rem] lg:w-[28rem] lg:shrink-0">
          <div className="mb-3 grid grid-cols-[auto,1fr] gap-x-2 items-start">
            <img
              src={lamp}
              alt="Lamp"
              className="row-span-2 h-32 w-auto lg:h-[12rem] object-contain -ml-1"
            />
            <div className="lg:-ml-3 lg:mt-12">
              <h1 className="font-display text-4xl lg:text-[2.75rem] leading-none">
                CLEAN STREET
              </h1>
              <p className="font-display text-base lg:text-lg text-gray-700 -mt-1">
                Report Track Resolve
              </p>
            </div>
            <h2 className="font-display text-xl lg:text-2xl mt-2 lg:mt-2 lg:-ml-10 first-letter:text-3xl lg:first-letter:text-4xl first-letter:mr-1">
              Login
            </h2>
          </div>

          <form className="space-y-2" onSubmit={onSubmit}>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <div>
              <label className="block mb-0.5 text-sm">Email / Phone</label>
              <input
                className="input py-1.5"
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-0.5 text-sm">Password</label>
              <input
                className="input py-1.5"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-full py-1.5" type="submit">
              Login
            </button>
          </form>

          <div className="mt-2.5 text-right">
            <button className="text-sm text-brand-700 hover:underline">
              Forgot Password?
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <button className="btn btn-ghost w-full py-1.5">
              {" "}
              Continue with Google
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-brand-700 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
