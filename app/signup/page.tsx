"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: fullName.trim(),
      phone: phone.trim(),
    },
  },
});
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/order");
      return;
    }

    setMessage(
      "Account created. Please check your email to confirm your account."
    );

    setLoading(false);
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
            Customer Account
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2B211B]">
            Create your account
          </h1>

          <p className="mt-3 text-[#2B211B]/60">
            Create an account to continue with your order.
          </p>
        </div>

        <div className="rounded-3xl border border-[#174A35]/10 bg-[#FFFDF8] p-7 shadow-xl shadow-black/5">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSignup}
          >
            ```tsx
<div>
  <label
    htmlFor="fullName"
    className="mb-2 block text-sm font-medium"
  >
    Full Name
  </label>
  <input
    id="fullName"
    type="text"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    placeholder="Enter your full name"
    required
    autoComplete="name"
    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-800"
  />
</div>

<div>
  <label
    htmlFor="phone"
    className="mb-2 block text-sm font-medium"
  >
    Phone Number
  </label>
  <input
    id="phone"
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Enter your phone number"
    required
    autoComplete="tel"
    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-800"
  />
</div>
```
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#174A35]/15 bg-white px-4 py-3.5 outline-none transition focus:border-[#174A35] focus:ring-2 focus:ring-[#174A35]/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#2B211B]"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full rounded-xl border border-[#174A35]/15 bg-white px-4 py-3.5 outline-none transition focus:border-[#174A35] focus:ring-2 focus:ring-[#174A35]/10"
                required
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {message && (
              <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#174A35] px-4 py-3.5 font-medium text-[#F5EBDD] transition hover:bg-[#A9432E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#2B211B]/60">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[#A9432E] hover:underline"
            >
              Sign in
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