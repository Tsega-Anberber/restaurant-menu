"use client";

import { FormEvent, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F5EBDD] text-[#2B211B]">
      <Header />

      {/* Hero */}
      <section className="bg-[#174A35] px-6 pb-20 pt-32 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
              Contact Us
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#F5EBDD] md:text-6xl">
              We would love to
              <br />
              hear from you.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F5EBDD]/70">
              Have a question, want to make an inquiry, or simply want to say
              hello? Send us a message and our team will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A9432E]">
              Get In Touch
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#174A35] md:text-4xl">
              Visit or contact us.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-[#2B211B]/60">
              Whether you have a question about our menu or want to learn more
              about Etalem Kitfo, we're happy to help.
            </p>

            <div className="mt-10 space-y-7">
              {/* Location */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#174A35] text-[#D4A72C]">
                  <span>⌖</span>
                </div>

                <div>
                  <h3 className="font-semibold text-[#174A35]">
                    Location
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#2B211B]/60">
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#174A35] text-[#D4A72C]">
                  <span>☎</span>
                </div>

                <div>
                  <h3 className="font-semibold text-[#174A35]">
                    Phone
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#2B211B]/60">
                    +251 900 000 000
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#174A35] text-[#D4A72C]">
                  <span>✉</span>
                </div>

                <div>
                  <h3 className="font-semibold text-[#174A35]">
                    Email
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#2B211B]/60">
                    hello@etalemkitfo.com
                  </p>
                </div>
              </div>

              {/* Opening hours */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#174A35] text-[#D4A72C]">
                  <span>◷</span>
                </div>

                <div>
                  <h3 className="font-semibold text-[#174A35]">
                    Opening Hours
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#2B211B]/60">
                    Monday – Sunday
                    <br />
                    8:00 AM – 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-[#174A35]/10 bg-[#FFFDF8] p-7 shadow-sm md:p-10">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#174A35] text-2xl text-[#D4A72C]">
                  ✓
                </div>

                <h2 className="mt-6 text-2xl font-bold text-[#174A35]">
                  Message received!
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-[#2B211B]/60">
                  Thank you for contacting Etalem Kitfo. We'll get back to you
                  as soon as possible.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-full border border-[#174A35]/20 px-6 py-3 text-sm font-semibold text-[#174A35] transition-colors hover:bg-[#174A35] hover:text-[#F5EBDD]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A9432E]">
                    Send a Message
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-[#174A35]">
                    How can we help?
                  </h2>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-[#2B211B]"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-[#174A35]/15 bg-[#F5EBDD]/50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[#2B211B]/35 focus:border-[#174A35] focus:ring-2 focus:ring-[#174A35]/10"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-[#2B211B]"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-[#174A35]/15 bg-[#F5EBDD]/50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[#2B211B]/35 focus:border-[#174A35] focus:ring-2 focus:ring-[#174A35]/10"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-[#2B211B]"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Write your message..."
                      className="mt-2 w-full resize-none rounded-xl border border-[#174A35]/15 bg-[#F5EBDD]/50 px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[#2B211B]/35 focus:border-[#174A35] focus:ring-2 focus:ring-[#174A35]/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#A9432E] px-6 py-3.5 text-sm font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#933B28]"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#174A35] px-6 py-20 text-center md:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
            Etalem Kitfo
          </p>

          <h2 className="mt-4 text-3xl font-bold text-[#F5EBDD] md:text-4xl">
            Good food is better together.
          </h2>

          <a
            href="/order"
            className="mt-8 inline-flex rounded-full bg-[#A9432E] px-7 py-3.5 text-sm font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#933B28]"
          >
            Order Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}