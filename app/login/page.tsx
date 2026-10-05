"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Incorrect email or password.");
      setLoading(false);
      return;
    }

    router.push("/order");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5EBDD] px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a
            href="/"
            className="text-xl font-bold text-[#174A35]"
          >
            Etalem Kitfo
          </a>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#A9432E]">
            Customer Login
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2B211B]">
            Welcome back
          </h1>

          <p className="mt-3 text-[#2B211B]/60">
            Sign in to continue with your order.
          </p>
        </div>

        <div className="rounded-3xl border border-[#174A35]/10 bg-[#FFFDF8] p-7 shadow-xl shadow-black/5">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleLogin}
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#2B211B]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#174A35]/15 bg-white px-4 py-3.5 outline-none transition focus:border-[#174A35] focus:ring-2 focus:ring-[#174A35]/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#2B211B]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#174A35]/15 bg-white px-4 py-3.5 outline-none transition focus:border-[#174A35] focus:ring-2 focus:ring-[#174A35]/10"
                required
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#174A35] px-4 py-3.5 font-medium text-[#F5EBDD] transition hover:bg-[#A9432E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#2B211B]/60">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-[#A9432E] hover:underline"
            >
              Create one
            </a>
          </div>
        </div>

        <a
          href="/"
          className="mt-6 block text-center text-sm text-[#2B211B]/60 hover:text-[#174A35]"
        >
          ← Back to menu
        </a>
      </div>
    </main>
  );
}