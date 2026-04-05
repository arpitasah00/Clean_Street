export default function Services() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <section className="border-b border-gray-200/60 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
            Services
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-display font-semibold text-gray-900 dark:text-white">
            Tools for cleaner, safer streets.
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-gray-600 dark:text-gray-300">
            CleanStreet offers a suite of features for residents, volunteers, and local bodies to
            collaborate on city cleanliness and civic upkeep.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid gap-8 md:grid-cols-3">
        <ServiceCard
          title="Issue reporting portal"
          text="Mobile-friendly forms with photo uploads and location tagging make it effortless to send detailed reports."
        />
        <ServiceCard
          title="Volunteer coordination"
          text="Organize community clean-ups, assign tasks, and track participation for each drive."
        />
        <ServiceCard
          title="Admin dashboards"
          text="Authorities can view heatmaps, filter by category, and manage reports from a single console."
        />
      </section>

      <section className="bg-gray-50/80 dark:bg-gray-900/70 border-y border-gray-200/70 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid gap-10 md:grid-cols-2 items-start">
          <div className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-200">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
              For residents
            </h2>
            <ul className="mt-2 space-y-2 list-disc list-inside text-sm md:text-base">
              <li>Easy reporting of litter, potholes, damaged lights, and more</li>
              <li>Real-time status updates and notifications</li>
              <li>Upvote issues that impact your neighborhood most</li>
            </ul>
          </div>
          <div className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-200">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
              For local bodies & partners
            </h2>
            <ul className="mt-2 space-y-2 list-disc list-inside text-sm md:text-base">
              <li>Centralized complaint intake with clear categorization</li>
              <li>Insights into hotspots and recurring problems</li>
              <li>Exportable data for planning and reporting</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ title, text }) {
  return (
    <div className="group [perspective:1200px]">
      <div className="rounded-2xl border border-gray-200/80 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 p-6 shadow-soft transform-gpu transition duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl">
        <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
