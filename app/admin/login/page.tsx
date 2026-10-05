"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

export default function AdminLogin() {
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

    router.push("/admin/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F6F1] px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            Etalem Kitfo
          </a>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#A66A3F]">
            Admin Portal
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-3 text-[#716D67]">
            Sign in to manage your restaurant menu.
          </p>
        </div>

        <div className="rounded-3xl border border-[#E6E1D8] bg-white p-7 shadow-xl shadow-black/5">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleLogin}
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#DDD8CF] bg-[#FCFBF8] px-4 py-3.5 outline-none transition focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#DDD8CF] bg-[#FCFBF8] px-4 py-3.5 outline-none transition focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/10"
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
              className="rounded-xl bg-[#24221F] px-4 py-3.5 font-medium text-white transition hover:bg-[#3A3732] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <a
          href="/"
          className="mt-6 block text-center text-sm text-[#716D67] hover:text-[#24221F]"
        >
          ← Back to menu
        </a>
      </div>
    </main>
  );
}