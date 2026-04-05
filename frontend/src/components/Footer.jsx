import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-100 border-t border-gray-800 mt-0">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="CleanStreet logo"
                className="w-9 h-9 object-contain"
              />
              <span className="font-display text-xl tracking-wide">
                CleanStreet
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-300 max-w-sm">
              Empowering citizens to take an active role in maintaining and
              improving the cleanliness of their neighborhoods.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-[0.2em] text-gray-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-blue-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="hover:text-blue-400 transition-colors">
                  View Reports
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-[0.2em] text-gray-400">
              Get Started
            </h3>
            <p className="mt-4 text-sm text-gray-300 max-w-sm">
              We can foster collaboration between residents, volunteers, and
              local authorities to create cleaner, healthier, and more vibrant
              communities.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Clean Street Initiative. Made with {""}
            <span className="text-red-500">&#10084;</span> for a cleaner community.
          </p>
        </div>
      </div>
    </footer>
  );
}
