"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Load cart count
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        const cart = JSON.parse(savedCart);
        setCartCount(cart.length);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // Header scroll behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setShowHeader(true);
        setIsScrolled(false);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
        setIsScrolled(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-6 md:pt-5
        transition-transform duration-500 ease-out
        ${showHeader ? "translate-y-0" : "-translate-y-[120%]"}`}
    >
      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between
          px-5 py-4 md:px-7
          transition-all duration-500 ease-out
          ${
            isScrolled
              ? "rounded-2xl border border-[#D4A72C]/30 bg-[#174A35]/95 shadow-lg shadow-black/15 backdrop-blur-md"
              : "rounded-none border border-transparent bg-transparent shadow-none"
          }`}
      >
        {/* Logo */}
        <a
          href="/"
          className={`text-xl font-bold tracking-tight transition-colors duration-500 ${
            isScrolled ? "text-[#F5EBDD]" : "text-white"
          }`}
        >
          Etalem Kitfo
        </a>

        {/* Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <a
            href="/"
            className={`text-sm font-medium transition-colors duration-500 ${
              isScrolled
                ? "text-[#F5EBDD]/90 hover:text-[#D4A72C]"
                : "text-white/90 hover:text-white"
            }`}
          >
            Menu
          </a>

          <a
            href="/order"
            className={`text-sm font-medium transition-colors duration-500 ${
              isScrolled
                ? "text-[#F5EBDD]/90 hover:text-[#D4A72C]"
                : "text-white/90 hover:text-white"
            }`}
          >
            Order
          </a>

          <a
            href="/about"
            className={`text-sm font-medium transition-colors duration-500 ${
              isScrolled
                ? "text-[#F5EBDD]/90 hover:text-[#D4A72C]"
                : "text-white/90 hover:text-white"
            }`}
          >
            About
          </a>

          <a
            href="/contact"
            className={`text-sm font-medium transition-colors duration-500 ${
              isScrolled
                ? "text-[#F5EBDD]/90 hover:text-[#D4A72C]"
                : "text-white/90 hover:text-white"
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <a
            href="/my-orders"
            className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
              isScrolled
                ? "text-[#F5EBDD] hover:bg-[#F5EBDD]/10"
                : "text-white hover:bg-white/10"
            }`}
          >
            {/* Cart icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75c.621 0 1.17-.383 1.408-.956l2.2-5.294a.75.75 0 0 0-.693-1.037H5.106m2.394 7.287L5.106 5.272m2.394 8.978a3 3 0 1 0 5.25 2.25m2.25-2.25a3 3 0 1 0 5.25 2.25"
              />
            </svg>

            <span className="hidden sm:inline">Cart</span>

            {/* Cart count */}
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#A9432E] px-1 text-[11px] font-bold text-[#F5EBDD]">
                {cartCount}
              </span>
            )}
          </a>

          {/* Admin */}
          <a
            href="/admin/login"
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 ${
              isScrolled
                ? "bg-[#A9432E] text-[#F5EBDD] hover:bg-[#933B28]"
                : "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            Admin
          </a>
        </div>
      </div>
    </header>
  );
}