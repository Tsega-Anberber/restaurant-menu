"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { createClient } from "../../lib/supabase/client";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  items: OrderItem[];
  total: string;
  status: string;
  createdAt: string;
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const loadOrders = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/orders");

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Could not load your orders."
          );
        }

        setOrders(data.orders);
      } catch (error) {
        console.error("LOAD ORDERS ERROR:", error);
        setError("Could not load your orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <main className="min-h-screen bg-[#F5EBDD] text-[#2B211B]">
      <Header />

      <section className="bg-[#174A35] px-6 pb-16 pt-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
            Account
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#F5EBDD] md:text-6xl">
            My Orders
          </h1>

          <p className="mt-5 max-w-xl text-[#F5EBDD]/70">
            View your previous orders and check their status.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 md:px-10">
        {loading && (
          <div className="rounded-2xl border border-[#174A35]/10 bg-[#FFFDF8] p-10 text-center">
            <p className="text-[#2B211B]/60">
              Loading your orders...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="rounded-2xl border border-[#174A35]/10 bg-[#FFFDF8] p-10 text-center">
            <h2 className="text-xl font-bold text-[#174A35]">
              No orders yet
            </h2>

            <p className="mt-2 text-sm text-[#2B211B]/60">
              Your orders will appear here after you place one.
            </p>

            <button
              onClick={() => router.push("/order")}
              className="mt-6 rounded-full bg-[#A9432E] px-6 py-3 text-sm font-semibold text-[#F5EBDD] transition hover:bg-[#174A35]"
            >
              Browse Menu
            </button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-[#174A35]/10 bg-[#FFFDF8] p-6"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-[#174A35]/10 pb-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm text-[#2B211B]/50">
                      Order #{order.id}
                    </p>

                    <p className="mt-1 text-sm text-[#2B211B]/60">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-[#D4A72C]/15 px-4 py-2 text-sm font-semibold capitalize text-[#174A35]">
                    {order.status}
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-medium">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm text-[#2B211B]/50">
                          {item.quantity} × {item.price} ETB
                        </p>
                      </div>

                      <p className="font-semibold text-[#174A35]">
                        {item.quantity * item.price} ETB
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#174A35]/10 pt-5">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-bold text-[#A9432E]">
                    {order.total} ETB
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}