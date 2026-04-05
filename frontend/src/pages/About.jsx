export default function About() {
  return (
    <div className="min-h-screen bg-[#f3f6fb] dark:bg-gray-950 flex items-start md:items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-3xl shadow-soft border border-gray-100/80 dark:border-gray-800 px-5 md:px-10 py-10 md:py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-400/60 mb-4">
            <span className="text-3xl text-indigo-500">i</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-gray-900 dark:text-white">
            About Clean Street
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-300">
            Connecting communities for a cleaner tomorrow.
          </p>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700" />

        <div className="mt-10 space-y-10 md:space-y-12">
          <div>
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-display font-semibold text-gray-900 dark:text-white">
              <span className="text-2xl text-yellow-500">◎</span>
              Our Mission
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-200">
              Clean Street is dedicated to empowering citizens to take an active role in maintaining
              and improving the cleanliness of their neighborhoods. We believe that by providing an
              easy-to-use platform for reporting and tracking local environmental issues, we can
              foster collaboration between residents, volunteers, and local authorities to create
              cleaner, healthier, and more vibrant communities.
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-display font-semibold text-gray-900 dark:text-white">
              <span className="text-2xl text-yellow-500">👥</span>
              Who We Are
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-200">
              We are a community-focused initiative leveraging technology to address common urban
              challenges like garbage disposal, road damage, and infrastructure maintenance. Our
              platform connects people who care about their local environment with the resources
              and channels needed to make a tangible difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
