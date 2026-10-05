import Header from "../../components/header";
import Footer from "../../components/footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F5EBDD] text-[#2B211B]">
      <Header />

      {/* Hero */}
      <section className="bg-[#174A35] px-6 pb-20 pt-32 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
              About Etalem Kitfo
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#F5EBDD] md:text-6xl">
              Food rooted in tradition,
              <br />
              made for today.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F5EBDD]/70">
              At Etalem Kitfo, we believe good food brings people together.
              Our kitchen combines Ethiopian flavors, fresh ingredients, and
              thoughtful preparation to create memorable meals.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A9432E]">
              Our Story
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#174A35] md:text-5xl">
              A table made for sharing.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-7 text-[#2B211B]/65">
              <p>
                Etalem Kitfo was created around a simple idea: serve food that
                feels familiar, welcoming, and carefully made.
              </p>

              <p>
                From traditional Ethiopian dishes to modern favorites, every
                plate is prepared with attention to flavor and quality.
              </p>

              <p>
                Whether you're joining us for a quick meal or sitting down with
                friends and family, our goal is to make every visit feel like
                coming to a shared table.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-3xl bg-[#174A35]">
            <img
              src="/food-2.jpg"
              alt="Food served at Etalem Kitfo"
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#FFFDF8] px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A9432E]">
              What We Care About
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#174A35] md:text-5xl">
              Simple things, done well.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#174A35]/10 bg-[#F5EBDD] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174A35] text-xl text-[#D4A72C]">
                ✦
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#174A35]">
                Fresh Ingredients
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#2B211B]/60">
                We focus on quality ingredients and thoughtful preparation in
                every dish.
              </p>
            </div>

            <div className="rounded-2xl border border-[#174A35]/10 bg-[#F5EBDD] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174A35] text-xl text-[#D4A72C]">
                ✦
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#174A35]">
                Ethiopian Flavor
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#2B211B]/60">
                Traditional spices and familiar flavors are an important part
                of our kitchen.
              </p>
            </div>

            <div className="rounded-2xl border border-[#174A35]/10 bg-[#F5EBDD] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174A35] text-xl text-[#D4A72C]">
                ✦
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#174A35]">
                Good Moments
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#2B211B]/60">
                We want our restaurant to be a place where people can relax,
                connect, and enjoy their time together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="px-6 py-20 text-center md:px-10 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A9432E]">
            Come Visit Us
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#174A35] md:text-5xl">
            Good food. Good moments.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#2B211B]/60">
            We look forward to welcoming you to Etalem Kitfo.
          </p>

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