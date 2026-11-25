import {
  FiMapPin,
  FiStar,
  FiAward,
  FiHeart,
  FiCompass,
  FiShield,
  FiCoffee,
  FiUsers,
  FiGlobe,
  FiTarget,
  FiEye,
  FiCheckCircle,
  FiArrowRight,
  FiCalendar,
  FiClock,
    FiBriefcase,
  FiZap,
} from "react-icons/fi";

const About = () => {
  return (
    <main className="overflow-hidden bg-slate-900 text-gray-300">
      {/* Hero Section */}
      <section className="relative border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24 lg:px-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
              <FiStar size={16} />
              Discover Our Story
            </span>

            <h1 className="mt-7 max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              More Than a Stay,
              <span className="mt-2 block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                It's an Experience.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-400 sm:text-lg">
              We believe every journey deserves a remarkable place to stay.
              Discover thoughtfully selected accommodations, exceptional
              hospitality, and a seamless booking experience designed
              around you.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/rooms"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-semibold text-slate-900 shadow-lg shadow-amber-950/20 transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                Explore Stays
                <FiArrowRight size={18} />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-800/70 px-6 py-3.5 font-semibold text-gray-200 transition hover:border-slate-500 hover:bg-slate-700"
              >
                Our Story
                <FiCompass size={17} />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400" size={17} />
                Thoughtful Hospitality
              </span>
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-400" size={17} />
                Seamless Reservations
              </span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-lg py-5">
            <div className="absolute inset-10 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-700 bg-slate-800 p-3 shadow-2xl shadow-black/30 sm:p-4">
              <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-6 sm:min-h-[440px] sm:p-8">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
                <div className="absolute -right-5 -top-5 h-44 w-44 rounded-full border border-white/10" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-amber-300">
                    <FiAward size={28} />
                  </div>

                  <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-300">
                    Hospitality Redefined
                  </span>
                </div>

                <div className="relative py-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                    A Place to Belong
                  </p>

                  <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                    Discover Places
                    <br />
                    Worth Remembering.
                  </h2>

                  <p className="mt-4 max-w-xs text-sm leading-7 text-gray-400">
                    From peaceful retreats to vibrant city escapes, find a
                    stay that feels right for you.
                  </p>
                </div>

                <div className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                    <FiMapPin size={24} />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Your Next Destination
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      Your journey begins here.
                    </p>
                  </div>

                  <FiArrowRight className="ml-auto text-amber-300" size={20} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-2 pt-4 sm:p-3">
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                  <FiHeart className="text-rose-400" size={23} />
                  <p className="mt-3 font-semibold text-white">
                    Guest First
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Comfort in every detail
                  </p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                  <FiShield className="text-emerald-400" size={23} />
                  <p className="mt-3 font-semibold text-white">
                    Book with Confidence
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    A simple booking journey
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-amber-300 shadow-xl sm:-right-5">
              <FiStar size={25} />
            </div>

            <div className="absolute -bottom-2 -left-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-indigo-400 shadow-xl sm:-left-5">
              <FiGlobe size={25} />
            </div>
          </div>
        </div>
      </section>

      {/* About Introduction */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              Who We Are
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Bringing Better Travel Experiences Within Reach
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-400">
              We are a hotel booking platform built to make finding and
              reserving accommodation easier. Whether you're planning a
              relaxing vacation, a business trip, or a spontaneous weekend
              away, we want you to spend less time worrying about
              accommodation and more time enjoying your journey.
            </p>

            <p className="mt-4 text-base leading-8 text-gray-400">
              Our approach is simple: make it easier to discover suitable
              stays, understand your options, and complete your reservation
              with confidence.
            </p>

            <div className="mt-7 space-y-4">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="mt-1 shrink-0 text-amber-400" size={19} />
                <p className="text-sm leading-6 text-gray-300">
                  An easy-to-use accommodation discovery and booking
                  experience.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiCheckCircle className="mt-1 shrink-0 text-amber-400" size={19} />
                <p className="text-sm leading-6 text-gray-300">
                  Options for different travel preferences and budgets.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiCheckCircle className="mt-1 shrink-0 text-amber-400" size={19} />
                <p className="text-sm leading-6 text-gray-300">
                  Guest assistance for questions about bookings and stays.
                </p>
              </div>
            </div>
          </div>

          {/* Hospitality Feature Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-400/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                <FiCompass size={25} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                Discover More
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Find accommodation suited to your destination, travel
                plans, and personal preferences.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 sm:mt-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <FiCalendar size={25} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                Simple Booking
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Navigate the reservation process with a clear and
                convenient booking experience.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <FiShield size={25} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                Guest Confidence
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Clear information helps guests make informed decisions
                before reserving their stay.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition duration-300 hover:-translate-y-1 hover:border-rose-400/30 sm:mt-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <FiHeart size={25} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                Thoughtful Service
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                We believe a great travel experience starts with care,
                convenience, and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="border-y border-slate-800 bg-slate-800/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-20 lg:px-12">
          <div className="rounded-3xl border border-slate-700 bg-slate-800 p-7 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300">
              <FiTarget size={28} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              Our Mission
            </h2>

            <p className="mt-4 text-base leading-8 text-gray-400">
              Our mission is to simplify hotel booking by helping travelers
              discover suitable accommodations and make reservations through
              a convenient, transparent, and guest-focused experience.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-amber-300">
              <FiCheckCircle size={18} />
              Making every booking easier
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950 via-slate-800 to-slate-800 p-7 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
              <FiEye size={28} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              Our Vision
            </h2>

            <p className="mt-4 text-base leading-8 text-gray-400">
              Our vision is to become a trusted destination for travelers
              seeking memorable stays, reliable booking information, and
              an easier way to plan journeys around the world.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-300">
              <FiGlobe size={18} />
              Connecting people with places
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            What Matters to Us
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The Values Behind Every Stay
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-400">
            Our approach to hospitality is guided by principles that put
            travelers, trust, and memorable experiences first.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition hover:border-amber-400/40 hover:bg-slate-800/80">
            <FiHeart className="text-amber-300" size={28} />

            <h3 className="mt-5 font-bold text-white">
              Guest First
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Prioritize guest comfort and make every step of the booking
              journey straightforward.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition hover:border-emerald-400/40 hover:bg-slate-800/80">
            <FiShield className="text-emerald-400" size={28} />

            <h3 className="mt-5 font-bold text-white">
              Trust & Transparency
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Present clear accommodation details and help guests
              understand their reservation choices.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition hover:border-indigo-400/40 hover:bg-slate-800/80">
            <FiZap className="text-indigo-400" size={28} />

            <h3 className="mt-5 font-bold text-white">
              Simplicity
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Reduce unnecessary complexity so guests can focus on
              planning and enjoying their travels.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition hover:border-rose-400/40 hover:bg-slate-800/80">
            <FiGlobe className="text-rose-400" size={28} />

            <h3 className="mt-5 font-bold text-white">
              Wider Possibilities
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Help travelers explore new destinations and find stays
              that suit their individual needs.
            </p>
          </div>
        </div>
      </section>

      {/* Hospitality Commitment */}
      <section className="border-y border-slate-800 bg-slate-800/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-20 lg:px-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              The Difference
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Every Journey Deserves a Better Beginning
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-400">
              Choosing where to stay is an important part of any trip.
              We aim to make that choice easier with a booking experience
              that values convenience, useful information, and the needs
              of every traveler.
            </p>

            <a
              href="/rooms"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-amber-300 transition hover:text-amber-200"
            >
              Find Your Next Stay
              <FiArrowRight size={18} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <FiMapPin className="text-amber-300" size={27} />
              <h3 className="mt-5 font-bold text-white">
                Explore Destinations
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                Discover accommodation options for your next trip.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <FiClock className="text-indigo-400" size={27} />
              <h3 className="mt-5 font-bold text-white">
                Save Planning Time
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                Keep your accommodation search and reservations organized.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <FiCoffee className="text-emerald-400" size={27} />
              <h3 className="mt-5 font-bold text-white">
                Travel Your Way
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                Choose stays based on your personal travel preferences.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
              <FiBriefcase className="text-rose-400" size={27} />
              <h3 className="mt-5 font-bold text-white">
                Business or Leisure
              </h3>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                Plan accommodation for work trips, vacations, and getaways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-800 via-slate-800 to-indigo-950 px-6 py-12 text-center shadow-2xl shadow-black/20 sm:px-12 sm:py-16">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-400/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
              <FiMapPin size={28} />
            </div>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Your Next Great Stay Starts Here
            </h2>

            <p className="mt-4 text-base leading-8 text-gray-400">
              Find a place that fits your journey, choose your dates, and
              start planning an experience worth remembering.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/rooms"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-amber-500 px-7 py-3.5 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                Browse Hotels
                <FiArrowRight size={18} />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-600 bg-slate-800 px-7 py-3.5 font-semibold text-gray-200 transition hover:border-slate-500 hover:bg-slate-700"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
