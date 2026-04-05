export default function HowItWorks() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <section className="border-b border-gray-200/60 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
            How it works
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-display font-semibold text-gray-900 dark:text-white">
            From report to resolution, in three simple steps.
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-gray-600 dark:text-gray-300">
            CleanStreet guides every issue from the moment it is reported until it is resolved,
            keeping citizens, volunteers, and authorities on the same page.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-3">
          <Step
            number="01"
            title="Report"
            text="Capture the issue with a short description, photos, and precise location right from your phone or browser."
          />
          <Step
            number="02"
            title="Track"
            text="Your report is routed to the right team. Watch its status move from Open to In Progress to Resolved."
          />
          <Step
            number="03"
            title="Engage"
            text="Neighbors can comment, vote, and volunteer, helping authorities prioritize and respond faster."
          />
        </div>
      </section>

      <section className="bg-gray-50/80 dark:bg-gray-900/70 border-y border-gray-200/70 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
          <div className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-200">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
              Built for everyday use
            </h2>
            <p>
              Whether you are walking your dog or commuting to work, reporting an issue takes just a
              few taps. CleanStreet is optimized for quick, repeat use so small issues never pile up.
            </p>
            <p>
              Behind the scenes, the platform groups similar reports, surfaces hotspots, and provides
              city teams with a live map of what needs attention.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-gray-700 dark:text-gray-200">
            <InfoCard title="Smart notifications" text="Stay informed with gentle updates when your report is acknowledged, assigned, and resolved." />
            <InfoCard title="Location aware" text="Integrated maps ensure every issue is pinned exactly where it happens, reducing back-and-forth." />
            <InfoCard title="Transparent history" text="Every action is logged so communities can see how issues have been handled over time." />
          </div>
        </div>
      </section>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="group [perspective:1200px]">
      <div className="relative rounded-2xl border border-gray-200/80 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-6 shadow-soft transform-gpu transition duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl">
        <div className="absolute -top-4 left-6 inline-flex items-center justify-center rounded-full bg-blue-500 text-white text-xs px-3 py-1 shadow-md">
          {number}
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-4 shadow-soft">
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
