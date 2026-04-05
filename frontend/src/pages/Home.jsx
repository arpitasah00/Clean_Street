import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

export default function Home() {
  return (
    <div className="relative bg-gray-950 text-gray-100 overflow-hidden">
      {/* Full-page background image up to footer */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      <div className="relative z-10">
        <section className="min-h-[70vh] md:min-h-[80vh] flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center text-white">
            <p className="text-sm md:text-base uppercase tracking-[0.3em] text-blue-200/80">
              Clean Street Initiative
            </p>
            <h1 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Building Cleaner Communities,
              <span className="text-blue-400"> Together.</span>
            </h1>
            <p className="mt-4 md:mt-5 text-sm md:text-lg max-w-2xl mx-auto text-blue-100">
              Report street issues easily, track their resolution, and
              collaborate with your community for a better neighborhood. Your
              action matters.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/report"
                className="px-6 py-2.5 rounded-full bg-blue-500 text-white font-medium shadow-soft hover:bg-blue-600 transition-colors"
              >
                + Report an Issue
              </Link>
              <Link
                to="/complaints"
                className="px-6 py-2.5 rounded-full border border-white/30 bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
              >
                👁️ View Reports
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-transparent text-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-display text-center">
              Precise Reporting. Real Impact.
            </h2>
            <p className="text-gray-100/80 text-center mt-2 max-w-2xl mx-auto text-sm md:text-base">
              Easily report issues, collaborate with neighbors and authorities,
              and watch your community become cleaner and safer.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Feature
                icon="📍"
                title="Precise Reporting"
                text="Easily report issues using map integration and photo uploads for accurate location and details."
              />
              <Feature
                icon="🤝"
                title="Community Driven"
                text="Engage with fellow citizens, volunteers, and officials on a unified platform for collective action."
              />
              <Feature
                icon="📊"
                title="Track Progress"
                text="Receive real-time updates and monitor the status of reported issues directly from your dashboard."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="group [perspective:1200px]">
      <div className="text-center rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-soft backdrop-blur-sm dark:bg-gray-900/70 dark:border-gray-700 transform-gpu transition duration-300 ease-out group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:[rotateX(6deg)] group-hover:[rotateY(-4deg)]">
        <div className="text-3xl">{icon}</div>
        <div className="mt-3 font-display font-semibold text-base md:text-lg text-gray-900 dark:text-white">
          {title}
        </div>
        <p className="text-sm md:text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
