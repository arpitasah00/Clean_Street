import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] items-start">
        {/* Left: Contact card */}
        <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm lg:shadow-md overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -left-10 w-56 h-56 bg-emerald-400/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 p-5 sm:p-6 lg:p-7 space-y-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-blue-500 uppercase mb-1">
                Contact Support
              </p>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] leading-tight text-gray-900 dark:text-white">
                We are here to help you keep streets clean.
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-xl">
                Reach out to the Clean Street support team for any issues with
                reporting complaints, tracking status, or managing your account.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="input py-2 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input py-2 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Topic
                </label>
                <select className="input py-2 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                  <option>Issue with reporting</option>
                  <option>Help with my account</option>
                  <option>Feedback / suggestion</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Message
                </label>
                <textarea
                  className="input min-h-[120px] bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-md bg-indigo-600 text-white text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors"
                >
                  Submit request
                </button>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 max-w-xs">
                  Our team typically responds within a few hours during working
                  days. For urgent civic issues, please also contact your local
                  authority helpline.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Info column */}
        <aside className="space-y-4 lg:space-y-5">
          <div className="rounded-2xl border border-gray-800/40 bg-gray-900 text-gray-100 shadow-sm p-5 lg:p-6">
            <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
                ✓
              </span>
              Clean Street Support
            </h2>
            <p className="text-xs text-gray-300 mb-3">
              Available 24/7 for urgent civic reporting issues.
            </p>
            <dl className="space-y-2 text-xs">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-gray-400">Email</dt>
                <dd className="font-medium text-gray-100">
                  support@cleanstreet.app
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-gray-400">Helpline</dt>
                <dd className="font-medium text-gray-100">+91-8000-111-222</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-gray-400">Response time</dt>
                <dd className="font-medium text-emerald-300">
                  Typically &lt; 4 hours
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/80 text-gray-100 p-4 lg:p-5 space-y-3">
            <h3 className="text-sm font-semibold">Need to report an issue?</h3>
            <p className="text-xs text-gray-300">
              For civic complaints like potholes, garbage, or water logging,
              it&apos;s faster to use the dedicated reporting flow.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/report"
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-white text-gray-900 text-xs font-medium shadow-sm hover:bg-gray-100"
              >
                Go to Report Issue
              </Link>
              <Link
                to="/complaints"
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-md border border-gray-600 text-xs font-medium text-gray-100 hover:bg-gray-800"
              >
                View existing reports
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
