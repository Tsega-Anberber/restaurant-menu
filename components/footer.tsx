export default function Footer() {
  return (
    <footer className="bg-[#174A35] text-[#F5EBDD]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <a
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              Etalem Kitfo
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#F5EBDD]/60">
              Good food, made with care. Bringing Ethiopian flavors,
              fresh ingredients, and good moments to the table.
            </p>

            <a
              href="/order"
              className="mt-6 inline-flex rounded-full bg-[#A9432E] px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#933B28]"
            >
              Order Now
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#D4A72C]">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="/"
                className="text-sm text-[#F5EBDD]/65 transition-colors hover:text-[#D4A72C]"
              >
                Menu
              </a>

              <a
                href="/order"
                className="text-sm text-[#F5EBDD]/65 transition-colors hover:text-[#D4A72C]"
              >
                Order
              </a>

              <a
                href="/about"
                className="text-sm text-[#F5EBDD]/65 transition-colors hover:text-[#D4A72C]"
              >
                About
              </a>

              <a
                href="/contact"
                className="text-sm text-[#F5EBDD]/65 transition-colors hover:text-[#D4A72C]"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#D4A72C]">
              Contact
            </h3>

            <div className="mt-5 space-y-1 text-sm text-[#F5EBDD]/65">
              <p>Addis Ababa, Ethiopia</p>

              <p>+251 900 000 000</p>

              <p>hello@etalemkitfo.com</p>

              <p className="pt-2 leading-6">
                Monday – Sunday
                <br />
                8:00 AM – 10:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-[#F5EBDD]/10" />

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-4 text-sm md:flex-row md:items-center">
          <p className="text-[#F5EBDD]/40">
            © 2026 Etalem Kitfo. All rights reserved.
          </p>

          
        </div>
      </div>
    </footer>
  );
}