import {
  FiFileText,
  FiCalendar,
  FiCreditCard,
  FiShield,
  FiAlertCircle,
  FiCheckCircle,
  FiUsers,
  FiXCircle,
  FiGlobe,
  FiMail,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-slate-900 text-gray-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-700">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
              <FiFileText className="text-base" />
              Legal Information
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Terms of <span className="text-amber-400">Service</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              Please read these terms carefully before using our hotel booking
              platform. They explain your rights, responsibilities, and the
              conditions that apply when you make a reservation with us.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5">
                <FiClock className="text-amber-400" />
                Last updated: October 26, 2026
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5">
                <FiShield className="text-amber-400" />
                Booking Terms & Conditions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6 sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-2xl text-amber-400">
                <FiFileText />
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Welcome to Our Booking Platform
              </h2>

              <p className="mt-4 leading-7 text-gray-400">
                These Terms of Service govern your access to and use of
                [Your Hotel Booking Website Name], including our website,
                booking features, and related services. By accessing our
                platform or making a reservation, you agree to these terms.
                If you do not agree, please do not use our services.
              </p>

              <p className="mt-4 leading-7 text-gray-400">
                In these terms, "we," "our," and "us" refer to
                [Your Hotel Booking Website Name]. "You" and "your" refer to
                any visitor, registered user, or person making a reservation
                through our platform.
              </p>
            </div>

            {/* Important Notice */}
            <div className="flex gap-4 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 sm:p-6">
              <FiAlertCircle className="mt-1 shrink-0 text-2xl text-amber-400" />
              <div>
                <h3 className="font-semibold text-white">Important Notice</h3>
                <p className="mt-2 text-sm leading-7 text-gray-400">
                  A reservation may also be subject to the specific terms,
                  cancellation rules, check-in requirements, and policies of
                  the hotel or property you select. Review those details
                  before completing your booking.
                </p>
              </div>
            </div>

            {/* Terms Sections */}
            <div className="space-y-6">
              <section
                id="acceptance"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiCheckCircle />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      1. Acceptance of Terms
                    </h2>
                    <div className="mt-4 space-y-3 leading-7 text-gray-400">
                      <p>
                        By using our platform, you confirm that you are legally
                        capable of entering into a binding agreement under
                        applicable law. If you use the platform on behalf of
                        another person, you confirm that you are authorized to
                        act on their behalf.
                      </p>
                      <p>
                        You agree to provide accurate information when creating
                        an account, making a booking, or contacting our support
                        team.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="services"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiGlobe />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      2. Our Services
                    </h2>
                    <div className="mt-4 space-y-3 leading-7 text-gray-400">
                      <p>
                        Our platform enables users to explore available
                        accommodations, compare property details, review
                        pricing, and submit hotel reservations.
                      </p>
                      <p>
                        Unless explicitly stated otherwise, we act as a booking
                        platform and do not own, operate, or manage every
                        property listed. Accommodation services are provided
                        by the relevant hotel or property operator.
                      </p>
                      <p>
                        Property descriptions, photographs, amenities, and
                        availability are provided for informational purposes
                        and may be updated by the relevant property.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="booking"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiCalendar />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      3. Reservations & Bookings
                    </h2>
                    <div className="mt-4 space-y-3 leading-7 text-gray-400">
                      <p>
                        When making a reservation, you must provide accurate
                        guest details, arrival and departure dates, the number
                        of guests, and any other required information.
                      </p>
                      <p>
                        A booking is considered confirmed only when the
                        platform or property provides the applicable
                        confirmation. A booking request or payment initiation
                        alone may not constitute confirmation.
                      </p>
                      <p>
                        You are responsible for reviewing your booking
                        confirmation, including dates, room type, guest
                        details, total price, and any special conditions.
                      </p>
                      <p>
                        If you identify an error or do not receive a
                        confirmation, contact our support team promptly.
                        Availability may change until a reservation is
                        confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="payments"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiCreditCard />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      4. Payments & Pricing
                    </h2>
                    <div className="mt-4 space-y-3 leading-7 text-gray-400">
                      <p>
                        Prices, taxes, service charges, deposits, and other
                        applicable fees will be displayed during the booking
                        process where the information is available. The
                        amount payable may depend on the property, room type,
                        dates, occupancy, and selected services.
                      </p>
                      <p>
                        You agree to provide valid payment details and
                        authorize the applicable charges when you submit a
                        booking that requires payment.
                      </p>
                      <p>
                        Some properties may require payment at the property,
                        a security deposit, or a card pre-authorization.
                        Such conditions should be reviewed before booking.
                      </p>
                      <p>
                        If a pricing or listing error is discovered, we will
                        take reasonable steps to address it and communicate
                        any available options before proceeding where
                        required by applicable law.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="cancellations"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiXCircle />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      5. Cancellations & Refunds
                    </h2>
                    <div className="mt-4 space-y-3 leading-7 text-gray-400">
                      <p>
                        Cancellation deadlines, refund eligibility, and
                        applicable penalties depend on the rate plan and
                        property policy associated with your reservation.
                      </p>
                      <p>
                        Some bookings may be non-refundable, while others may
                        allow cancellation without a fee until a specified
                        deadline. Always review the cancellation conditions
                        displayed before confirming your reservation.
                      </p>
                      <p>
                        Where a refund is approved, processing times may vary
                        depending on the payment provider, bank, and original
                        payment method.
                      </p>
                      <p>
                        If you need to change or cancel a booking, use the
                        available booking-management options or contact
                        support. Changes are subject to availability and
                        the applicable property terms.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="responsibilities"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiUsers />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      6. User Responsibilities
                    </h2>
                    <p className="mt-4 leading-7 text-gray-400">
                      When using our platform, you agree not to:
                    </p>

                    <ul className="mt-4 space-y-3">
                      <li className="flex gap-3 text-sm leading-6 text-gray-400">
                        <FiCheckCircle className="mt-1 shrink-0 text-amber-400" />
                        <span>
                          Provide false, misleading, or incomplete booking
                          information.
                        </span>
                      </li>
                      <li className="flex gap-3 text-sm leading-6 text-gray-400">
                        <FiCheckCircle className="mt-1 shrink-0 text-amber-400" />
                        <span>
                          Use the platform for unlawful, fraudulent, or
                          unauthorized purposes.
                        </span>
                      </li>
                      <li className="flex gap-3 text-sm leading-6 text-gray-400">
                        <FiCheckCircle className="mt-1 shrink-0 text-amber-400" />
                        <span>
                          Attempt to gain unauthorized access to accounts,
                          systems, or data.
                        </span>
                      </li>
                      <li className="flex gap-3 text-sm leading-6 text-gray-400">
                        <FiCheckCircle className="mt-1 shrink-0 text-amber-400" />
                        <span>
                          Interfere with the platform's operation, security,
                          or availability.
                        </span>
                      </li>
                      <li className="flex gap-3 text-sm leading-6 text-gray-400">
                        <FiCheckCircle className="mt-1 shrink-0 text-amber-400" />
                        <span>
                          Use automated tools to extract data or abuse booking
                          functionality without authorization.
                        </span>
                      </li>
                      <li className="flex gap-3 text-sm leading-6 text-gray-400">
                        <FiCheckCircle className="mt-1 shrink-0 text-amber-400" />
                        <span>
                          Violate the rights, privacy, or safety of other users
                          or property operators.
                        </span>
                      </li>
                    </ul>

                    <p className="mt-4 leading-7 text-gray-400">
                      We may restrict or suspend access where reasonably
                      necessary to protect the platform, users, or our legal
                      interests, subject to applicable law.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="property"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiShield />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      7. Hotel Property Policies
                    </h2>
                    <div className="mt-4 space-y-3 leading-7 text-gray-400">
                      <p>
                        Guests must comply with the selected property's
                        check-in and check-out times, identification
                        requirements, occupancy limits, smoking rules,
                        pet policies, and other applicable house rules.
                      </p>
                      <p>
                        Certain properties may require valid identification,
                        a minimum check-in age, or a payment card at arrival.
                        These requirements may differ between properties.
                      </p>
                      <p>
                        You are responsible for damage caused by you or
                        members of your party, subject to applicable law and
                        the property's disclosed policies.
                      </p>
                      <p>
                        We are not responsible for a property's independent
                        operational decisions, but you may contact us for
                        assistance with a booking-related concern.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="liability"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiAlertCircle />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      8. Limitation of Liability
                    </h2>
                    <div className="mt-4 space-y-3 leading-7 text-gray-400">
                      <p>
                        To the extent permitted by applicable law, we are not
                        liable for indirect, incidental, special, or
                        consequential losses arising from the use of our
                        platform or an inability to access it.
                      </p>
                      <p>
                        We do not guarantee uninterrupted or error-free
                        access to the platform, nor do we guarantee the
                        conduct, facilities, services, or performance of
                        independently operated properties.
                      </p>
                      <p>
                        Nothing in these terms excludes or limits liability
                        where such exclusion or limitation is prohibited by
                        law, including any applicable consumer rights.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="privacy"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiShield />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      9. Privacy & Data Protection
                    </h2>
                    <div className="mt-4 space-y-3 leading-7 text-gray-400">
                      <p>
                        We may process personal information needed to operate
                        the platform, manage reservations, process payments,
                        provide customer support, prevent fraud, and meet
                        legal obligations.
                      </p>
                      <p>
                        Our collection and use of personal information are
                        described in our Privacy Policy. By using the
                        platform, you acknowledge that you should review
                        that policy before providing personal information.
                      </p>
                      <p>
                        We do not intend these terms to override any privacy
                        rights or obligations that apply under relevant law.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="changes"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiClock />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      10. Changes to These Terms
                    </h2>
                    <div className="mt-4 space-y-3 leading-7 text-gray-400">
                      <p>
                        We may update these terms to reflect changes to our
                        services, operational practices, or legal requirements.
                        The updated version will be published on this page
                        with a revised update date.
                      </p>
                      <p>
                        Changes will apply from the date stated in the updated
                        terms, subject to applicable law. If you continue
                        using the platform after the changes take effect,
                        your continued use will be subject to the updated
                        terms to the extent legally permitted.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="contact"
                className="scroll-mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-xl text-amber-400">
                    <FiMail />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      11. Contact Us
                    </h2>
                    <p className="mt-4 leading-7 text-gray-400">
                      If you have questions about these Terms of Service,
                      booking conditions, or a reservation made through our
                      platform, please contact our support team.
                    </p>

                    <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900 p-5">
                      <p className="text-sm text-gray-500">Customer Support</p>
                      <p className="mt-2 break-all font-medium text-amber-400">
                        support@example.com
                      </p>
                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        [Your Hotel Booking Website Name]
                        <br />
                        [Your Business Address]
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Table of Contents */}
          <aside className="h-fit lg:sticky lg:top-8">
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white">
                On This Page
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Navigate through our terms and conditions.
              </p>

              <nav className="mt-5 space-y-1">
                <a
                  href="#acceptance"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiCheckCircle className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">1. Acceptance of Terms</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                <a
                  href="#services"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiGlobe className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">2. Our Services</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                <a
                  href="#booking"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiCalendar className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">3. Reservations & Bookings</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                <a
                  href="#payments"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiCreditCard className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">4. Payments & Pricing</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                <a
                  href="#cancellations"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiXCircle className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">5. Cancellations & Refunds</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                <a
                  href="#responsibilities"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiUsers className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">6. User Responsibilities</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                <a
                  href="#property"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiShield className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">7. Hotel Property Policies</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                <a
                  href="#liability"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiAlertCircle className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">8. Limitation of Liability</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                <a
                  href="#privacy"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiShield className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">9. Privacy & Data Protection</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                <a
                  href="#changes"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiClock className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">10. Changes to These Terms</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>

                <a
                  href="#contact"
                  className="group flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition-colors duration-200 hover:bg-slate-700 hover:text-white"
                >
                  <FiMail className="shrink-0 text-base text-amber-400" />
                  <span className="flex-1">11. Contact Us</span>
                  <FiChevronRight className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </nav>

              <div className="mt-6 border-t border-slate-700 pt-5">
                <div className="flex gap-3">
                  <FiShield className="mt-1 shrink-0 text-lg text-amber-400" />
                  <p className="text-xs leading-6 text-gray-500">
                    Please review these terms and the applicable property
                    policies before completing a reservation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-xl text-amber-400">
                <FiMail />
              </div>
              <h3 className="mt-4 font-semibold text-white">
                Need Assistance?
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Our support team can help with questions about reservations
                and these terms.
              </p>
              <p className="mt-4 break-all text-sm font-medium text-amber-400">
                support@example.com
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Bottom Notice */}
      <section className="border-t border-slate-700 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Thank you for choosing us.
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                We aim to make your booking experience clear, convenient,
                and reliable.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-gray-300 sm:self-center">
              <FiShield className="text-amber-400" />
              Your booking matters to us
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsOfService;