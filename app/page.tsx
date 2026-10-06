"use client";

import { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const heroImages = [
  "/food-1.jpg",
  "/food-2.jpg",
  "/food-3.jpg",
  "/food-4.jpg",
];
const menuCategories = ["Breakfast", "Lunch", "Dinner", "Dessert"];
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  available: boolean;
};



export default function Home() {
    const [activeSlide, setActiveSlide] = useState(0);
const [activeCategory, setActiveCategory] = useState("Breakfast");

const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
const [menuLoading, setMenuLoading] = useState(true);
const [menuError, setMenuError] = useState("");

  // Automatically change slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) =>
        current === heroImages.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
  async function loadMenu() {
    try {
      const response = await fetch("/api/menu");

      if (!response.ok) {
        throw new Error("Failed to load menu");
      }

      const data = await response.json();

      setMenuItems(data.menuItems);
    } catch (error) {
      console.error("MENU FETCH ERROR:", error);
      setMenuError("Could not load the menu.");
    } finally {
      setMenuLoading(false);
    }
  }

  loadMenu();
}, []);

  return (
    <main className="min-h-screen bg-[#F8F6F1] text-[#24221F]">
      <Header />

    
{/* Hero */}
<section className="relative flex min-h-screen items-center overflow-hidden">

  {/* Background slideshow */}
  <div className="absolute inset-0">
    {heroImages.map((image, index) => (
      <div
        key={image}
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out ${
          index === activeSlide
            ? "translate-x-0"
            : index < activeSlide
              ? "-translate-x-full"
              : "translate-x-full"
        }`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
    ))}
  </div>

  <div className="absolute inset-0 bg-[000000]/55" />

  <div className="absolute inset-0 bg-gradient-to-r from-[#100000]/85 via-[#000000]/45 to-transparent" />

  {/* Hero content */}
  <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
    <div className="max-w-3xl text-[#F5EBDD]">

      <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-[#D4A72C]">
        Welcome to Etalem Kitfo
      </p>

      <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
        Good food,
        <br />
        made with care.
      </h1>

      <p className="mt-7 max-w-xl text-lg leading-8 text-[#F5EBDD]/80 md:text-xl">
        Fresh ingredients, carefully prepared dishes, and
        unforgettable moments around the table.
      </p>

      {/* Buttons */}
      <div className="mt-9 flex flex-wrap gap-4">
        <a
          href="#menu"
          className="rounded-full bg-[#A9432E] px-7 py-3.5 text-sm font-semibold text-[#F5EBDD] transition-all duration-300 hover:bg-[#933B28] hover:-translate-y-0.5"
        >
          Explore Menu
        </a>

        <a
          href="#contact"
          className="rounded-full border border-[#F5EBDD]/50 bg-transparent px-7 py-3.5 text-sm font-semibold text-[#F5EBDD] transition-all duration-300 hover:border-[#D4A72C] hover:bg-[#174A35]/40 hover:text-[#D4A72C]"
        >
          Contact Us
        </a>
      </div>
    </div>
  </div>

  {/* Slide */}
  <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
    {heroImages.map((_, index) => (
      <button
        key={index}
        onClick={() => setActiveSlide(index)}
        aria-label={`Go to slide ${index + 1}`}
        className={`h-2 rounded-full transition-all duration-500 ${
          activeSlide === index
            ? "w-8 bg-[#D4A72C]"
            : "w-2 bg-[#F5EBDD]/50 hover:bg-[#F5EBDD]/80"
        }`}
      />
    ))}
  </div>

</section>

{/* Menu */}
      <section
        id="specials"
        className="mx-auto max-w-7xl px-6 py-24 md:px-10"
      >
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A66A3F]">
            Our Menu
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Todays Specials.
          </h2>

          <p className="mt-4 max-w-xl text-[#716D67]">
            Explore our selection of carefully prepared dishes.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#E6E1D8] bg-white p-5">
            <div className="mb-5 flex h-52 items-center justify-center overflow-hidden rounded-xl bg-[#EEE9E0]">
              <img
                src="/food-1.jpg"
                alt="Chicken Burger"
                className="h-full w-full object-cover"
              />
            </div>

            <h3 className="text-xl font-semibold">
              
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#716D67]">
              Grilled chicken, lettuce, tomato and house sauce.
            </p>

            <p className="mt-4 font-bold text-[#A66A3F]">
              450 ETB
            </p>
          </div>

          <div className="rounded-2xl border border-[#E6E1D8] bg-white p-5">
            <div className="mb-5 flex h-52 items-center justify-center overflow-hidden rounded-xl bg-[#EEE9E0]">
              <img
                src="/food-2.jpg"
                alt="Margherita Pizza"
                className="h-full w-full object-cover"
              />
            </div>

            <h3 className="text-xl font-semibold">
              Margherita Pizza
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#716D67]">
              Tomato sauce, mozzarella and fresh basil.
            </p>

            <p className="mt-4 font-bold text-[#A66A3F]">
              550 ETB
            </p>
          </div>

          <div className="rounded-2xl border border-[#E6E1D8] bg-white p-5">
            <div className="mb-5 flex h-52 items-center justify-center overflow-hidden rounded-xl bg-[#EEE9E0]">
              <img
                src="/food-3.jpg"
                alt="French Fries"
                className="h-full w-full object-cover"
              />
            </div>

            <h3 className="text-xl font-semibold">
              French Fries
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#716D67]">
              Crispy golden fries served with house sauce.
            </p>

            <p className="mt-4 font-bold text-[#A66A3F]">
              200 ETB
            </p>
          </div>
        </div>
      </section>
{/* Menu */}
<section
  id="menu"
  className="bg-[#F5EBDD] px-6 py-24 md:px-10"
>
  <div className="mx-auto max-w-6xl">

    {/* Menu heading */}
    <div className="mx-auto max-w-2xl text-center">

      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A9432E]">
        Our Menu
      </p>

      <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#2B211B] md:text-5xl">
        Something for every moment.
      </h2>

      <p className="mt-4 text-[#2B211B]/65">
        Discover carefully prepared dishes inspired by
        Ethiopian flavors and traditions.
      </p>

    </div>

    {/* Category buttons */}
    <div className="mt-12 flex justify-center">

      <div className="flex flex-wrap justify-center gap-2 rounded-full border border-[#174A35]/15 bg-[#FFFDF8] p-2">

        {menuCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-[#174A35] text-[#F5EBDD] shadow-sm"
                : "text-[#174A35] hover:bg-[#F5EBDD] hover:text-[#A9432E]"
            }`}
          >
            {category}
          </button>
        ))}

      </div>

    </div>

    {/* Menu items */}
    <div className="mt-14 grid gap-x-14 gap-y-8 md:grid-cols-2">

  {menuLoading && (
    <p className="col-span-full text-center text-[#2B211B]/65">
      Loading menu...
    </p>
  )}

  {menuError && (
    <p className="col-span-full text-center text-[#A9432E]">
      {menuError}
    </p>
  )}

  {!menuLoading &&
    !menuError &&
    menuItems
      .filter(
        (item) =>
          item.category === activeCategory && item.available
      )
      .map((item) => (
        <div
          key={item.id}
          className="group border-b border-[#174A35]/15 pb-7"
        >
          <div className="flex items-start justify-between gap-6">

            <div>
              <h3 className="text-lg font-semibold text-[#174A35] transition-colors duration-300 group-hover:text-[#A9432E]">
                {item.name}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#2B211B]/65">
                {item.description}
              </p>
            </div>

            <span className="shrink-0 text-sm font-bold text-[#D4A72C]">
              {item.price} ETB
            </span>

          </div>
        </div>
      ))}
</div>
    

  </div>
</section>

      {/* Contact */}
     <Footer />
    </main>
  );
}