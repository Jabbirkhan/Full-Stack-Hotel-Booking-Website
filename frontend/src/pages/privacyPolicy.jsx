import {
  FiShield,
  FiLock,
  FiUser,
  FiDatabase,
  FiCreditCard,
//   FiCookie,
  FiEye,
  FiShare2,
  FiMail,
  FiClock,
  FiGlobe,
  FiFileText,
  FiCheckCircle,
  FiChevronRight,
    FiAlertCircle,
  FiCalendar,
} from "react-icons/fi";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-slate-900 text-gray-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 shadow-lg shadow-black/10">
              <FiShield size={32} />
            </div>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
              <FiLock size={15} />
              Your Privacy Matters
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Privacy{" "}
              <span className="bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              Your trust is important to us. Learn how we collect, use,
              protect, and manage your personal information when you use
              our hotel booking platform.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2">
                <FiFileText className="text-indigo-400" size={16} />
                Privacy Information
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2">
                <FiLock className="text-emerald-400" size={16} />
                Data Protection
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Overview */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <FiEye size={23} />
            </div>
            <h2 className="mt-4 font-semibold text-white">
              Transparency
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Understand what information we collect and why we need it.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <FiShield size={23} />
            </div>
            <h2 className="mt-4 font-semibold text-white">
              Data Protection
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Learn about the measures we use to help safeguard your data.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
              <FiUser size={23} />
            </div>
            <h2 className="mt-4 font-semibold text-white">
              Your Choices
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Learn how to request access, corrections, or deletion where
              applicable.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-12 lg:px-12">
        {/* Table of Contents */}
        <aside className="h-fit rounded-2xl border border-slate-700 bg-slate-800 p-5 lg:sticky lg:top-6 lg:col-span-4">
          <h2 className="text-lg font-bold text-white">
            Policy Overview
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Explore the key sections of our privacy policy.
          </p>

          <nav aria-label="Privacy policy sections" className="mt-5 space-y-1">
            <a href="#introduction" className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition hover:bg-slate-700 hover:text-white">
              Introduction <FiChevronRight size={16} />
            </a>
            <a href="#information" className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition hover:bg-slate-700 hover:text-white">
              Information We Collect <FiChevronRight size={16} />
            </a>
            <a href="#usage" className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition hover:bg-slate-700 hover:text-white">
              How We Use Information <FiChevronRight size={16} />
            </a>
            <a href="#cookies" className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition hover:bg-slate-700 hover:text-white">
              Cookies and Tracking <FiChevronRight size={16} />
            </a>
            <a href="#payments" className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition hover:bg-slate-700 hover:text-white">
              Payments and Bookings <FiChevronRight size={16} />
            </a>
            <a href="#sharing" className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition hover:bg-slate-700 hover:text-white">
              Information Sharing <FiChevronRight size={16} />
            </a>
            <a href="#security" className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition hover:bg-slate-700 hover:text-white">
              Data Security <FiChevronRight size={16} />
            </a>
            <a href="#rights" className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition hover:bg-slate-700 hover:text-white">
              Your Privacy Rights <FiChevronRight size={16} />
            </a>
            <a href="#retention" className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition hover:bg-slate-700 hover:text-white">
              Data Retention <FiChevronRight size={16} />
            </a>
            <a href="#contact" className="flex items-center justify-between rounded-lg px-3 py-3 text-sm transition hover:bg-slate-700 hover:text-white">
              Contact Us <FiChevronRight size={16} />
            </a>
          </nav>

          <div className="mt-6 rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
              <FiLock size={17} />
              Need clarification?
            </div>
            <p className="mt-2 text-xs leading-6 text-gray-400">
              Contact our team if you have questions about how your
              personal information is handled.
            </p>
            <a
              href="/contact"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
            >
              Contact Support <FiChevronRight size={15} />
            </a>
          </div>
        </aside>

        {/* Main Policy */}
        <article className="min-w-0 space-y-6 lg:col-span-8">
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <FiFileText size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  1. Introduction
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  This Privacy Policy explains how [Your Hotel Booking
                  Website Name] collects, uses, stores, and shares
                  information when you visit our website, create an
                  account, make a reservation, or contact our team.
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
                  By using our services, you acknowledge that your
                  information may be processed as described in this policy,
                  subject to applicable law. Where consent is required,
                  we will request it separately.
                </p>
                <p className="mt-4 text-xs text-gray-500">
                  Last updated: [Insert Date]
                </p>
              </div>
            </div>
          </section>

          {/* Information Collection */}
          <section id="information" className="scroll-mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <FiDatabase size={23} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-white">
                  2. Information We Collect
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  Depending on how you use our platform, we may collect
                  the following categories of information:
                </p>

                <div className="mt-5 space-y-4">
                  <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                    <h3 className="flex items-center gap-2 font-semibold text-white">
                      <FiUser className="text-indigo-400" size={18} />
                      Personal Information
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      Name, email address, phone number, account details,
                      and other information you voluntarily provide.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                    <h3 className="flex items-center gap-2 font-semibold text-white">
                      <FiCalendar className="text-amber-300" size={18} />
                      Reservation Information
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      Hotel or room selection, check-in and check-out
                      dates, number of guests, booking references, and
                      special requests.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                    <h3 className="flex items-center gap-2 font-semibold text-white">
                      <FiGlobe className="text-emerald-400" size={18} />
                      Technical Information
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      IP address, browser type, device information, pages
                      visited, and usage information, where collected
                      through our services and technologies.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                    <h3 className="flex items-center gap-2 font-semibold text-white">
                      <FiMail className="text-violet-400" size={18} />
                      Communications
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      Messages, feedback, support requests, and
                      communications you send to us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use of Information */}
          <section id="usage" className="scroll-mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <FiCheckCircle size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  3. How We Use Your Information
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  We may use personal information for purposes such as:
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-400">
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Creating and managing user accounts.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Processing reservations, payments, cancellations, and
                    related requests.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Sending booking confirmations, important updates, and
                    service-related messages.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Responding to customer support inquiries.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Maintaining platform security, preventing fraud, and
                    improving service reliability.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-emerald-400" />
                    Meeting legal obligations and enforcing applicable
                    terms and policies.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section id="cookies" className="scroll-mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                {/* <FiCookie size={23} /> */}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  4. Cookies and Tracking Technologies
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  Our website may use cookies and similar technologies
                  to maintain sessions, remember preferences, support
                  security, and understand how visitors use our platform.
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
                  Where applicable, non-essential cookies and tracking
                  technologies will be used in accordance with your
                  preferences and consent requirements. You can also
                  manage cookies through your browser settings, although
                  disabling certain cookies may affect website features.
                </p>
              </div>
            </div>
          </section>

          {/* Payments */}
          <section id="payments" className="scroll-mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <FiCreditCard size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  5. Bookings and Payment Information
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  When you make a reservation, we process the information
                  needed to manage your booking, communicate with relevant
                  accommodation providers, and handle payment-related
                  operations.
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
                  Payments may be processed by third-party payment
                  providers. Their handling of payment information is
                  subject to their own terms and privacy policies.
                  Depending on the payment method and integration, we
                  may receive transaction identifiers, payment status,
                  and limited payment-related details.
                </p>

                <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
                  <div className="flex items-start gap-3">
                    <FiShield className="mt-0.5 shrink-0 text-emerald-400" size={19} />
                    <p className="text-sm leading-6 text-gray-400">
                      Do not assume that card details are never stored by
                      this website unless your actual payment integration
                      and data-handling practices support that statement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sharing */}
          <section id="sharing" className="scroll-mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <FiShare2 size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  6. How We Share Information
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  We may share relevant information with trusted recipients
                  when necessary to provide our services, including:
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-400">
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-indigo-400" />
                    Hotels and accommodation providers involved in your
                    reservation.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-indigo-400" />
                    Payment processors and fraud-prevention providers.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-indigo-400" />
                    Hosting, email, analytics, and technical service
                    providers used by our platform.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-indigo-400" />
                    Government authorities or other parties where required
                    by law or necessary to protect legal rights.
                  </li>
                </ul>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  We do not authorize service providers to use personal
                  information for unrelated purposes where restricted by
                  applicable agreements or law.
                </p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section id="security" className="scroll-mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <FiLock size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  7. Data Security
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  We aim to protect personal information using appropriate
                  technical and organizational safeguards. Depending on
                  our implementation, these may include access controls,
                  secure connections, authentication protections, and
                  monitoring for suspicious activity.
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
                  No online system or method of data transmission can be
                  guaranteed to be completely secure. We therefore cannot
                  promise absolute security, but we work to reduce risks
                  and respond appropriately to security incidents.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Rights */}
          <section id="rights" className="scroll-mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                <FiUser size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  8. Your Privacy Rights and Choices
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  Depending on your location and applicable law, you may
                  have rights to:
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-400">
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-amber-300" />
                    Request access to personal information we hold about you.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-amber-300" />
                    Request correction of inaccurate or incomplete data.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-amber-300" />
                    Request deletion or restriction of certain information.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-amber-300" />
                    Object to certain processing or withdraw consent where
                    processing relies on consent.
                  </li>
                  <li className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-amber-300" />
                    Opt out of marketing communications using the
                    unsubscribe instructions provided.
                  </li>
                </ul>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  To make a request, contact us using the details below.
                  We may need to verify your identity before responding.
                  Some information may need to be retained to complete
                  bookings, meet legal obligations, or resolve disputes.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section id="retention" className="scroll-mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <FiClock size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  9. Data Retention
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  We retain personal information for as long as reasonably
                  necessary to provide our services, manage reservations,
                  maintain records, resolve disputes, enforce agreements,
                  and meet applicable legal requirements.
                </p>
                <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
                  Retention periods depend on the type of information, the
                  purpose for which it was collected, and any applicable
                  legal obligations. When information is no longer needed,
                  we will take appropriate steps to delete or anonymize
                  it where feasible and lawful.
                </p>
              </div>
            </div>
          </section>

          {/* International Transfers */}
          <section className="rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <FiGlobe size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  10. International Data Transfers
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  Some service providers or accommodation partners may
                  process information in countries other than your own.
                  Where applicable, we take steps required by relevant
                  data-protection laws to ensure appropriate safeguards
                  for international transfers.
                </p>
              </div>
            </div>
          </section>

          {/* Children */}
          <section className="rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <FiAlertCircle size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  11. Children's Privacy
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  Our website is not intended to allow children to create
                  accounts or provide personal information in violation of
                  applicable law. Where local rules impose age requirements
                  or parental-consent obligations, those requirements apply.
                  If you believe a child has provided personal information
                  inappropriately, please contact us.
                </p>
              </div>
            </div>
          </section>

          {/* Policy Changes */}
          <section className="rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                <FiFileText size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  12. Changes to This Policy
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  We may update this Privacy Policy when our services,
                  data practices, or legal requirements change. We will
                  publish the revised policy on this page and update the
                  revision date. Where required by law, we will provide
                  additional notice or obtain consent for material changes.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-6 rounded-2xl border border-indigo-400/20 bg-linear-to-br from-slate-800 to-indigo-950/40 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                <FiMail size={23} />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-white">
                  13. Contact Us
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  If you have questions about this Privacy Policy or want
                  to make a privacy-related request, please contact us.
                </p>

                <div className="mt-5 space-y-3 text-sm">
                  <p className="text-gray-400">
                    Website:{" "}
                    <span className="break-all font-medium text-gray-200">
                      [Your Hotel Booking Website Name]
                    </span>
                  </p>
                  <p className="text-gray-400">
                    Email:{" "}
                    <a
                      href="mailto:privacy@example.com"
                      className="break-all font-medium text-indigo-300 transition hover:text-indigo-200"
                    >
                      privacy@example.com
                    </a>
                  </p>
                  <p className="text-gray-400">
                    Address:{" "}
                    <span className="text-gray-200">
                      [Your Business Address]
                    </span>
                  </p>
                </div>

                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
                >
                  Contact Our Team
                  <FiMail size={17} />
                </a>
              </div>
            </div>
          </section>
        </article>
      </section>

      {/* Privacy Reminder */}
      <section className="px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <FiShield size={25} />
          </div>
          <div>
            <h2 className="font-semibold text-white">
              Your Privacy Deserves Care
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-400">
              We aim to handle your information responsibly and provide
              clear information about our data practices. Please contact
              us if you need clarification about this policy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
