"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import Header from "../../components/header";
import Footer from "../../components/footer";
const orderItems = [
  {
    id: 1,
    name: "Chicken Burger",
    description:
      "Grilled chicken, lettuce, tomato and our house sauce in a toasted bun.",
    price: 450,
  },
  {
    id: 2,
    name: "Beef Tibs",
    description:
      "Tender beef sautéed with onions, peppers and traditional Ethiopian spices.",
    price: 650,
  },
  {
    id: 3,
    name: "Kitfo Special",
    description:
      "Traditional minced beef seasoned with mitmita, clarified butter and Ethiopian herbs.",
    price: 700,
  },
  {
    id: 4,
    name: "Doro Wot",
    description:
      "Tender chicken cooked slowly in a rich berbere sauce with traditional spices.",
    price: 650,
  },
  {
    id: 5,
    name: "Chocolate Cake",
    description:
      "Rich chocolate cake served with smooth house cream.",
    price: 250,
  },
  {
    id: 6,
    name: "Ethiopian Honey Cake",
    description:
      "Soft traditional cake finished with Ethiopian honey and warm spices.",
    price: 280,
  },
];

export default function OrderPage() {
  const router = useRouter();
const supabase = createClient();
  const [cart, setCart] = useState<number[]>([]);

  const addToOrder = (id: number) => {
    setCart((current) => [...current, id]);
  };

  const removeFromOrder = (id: number) => {
    setCart((current) => {
      const index = current.indexOf(id);

      if (index === -1) {
        return current;
      }

      return [
        ...current.slice(0, index),
        ...current.slice(index + 1),
      ];
    });
  };

  const getQuantity = (id: number) => {
    return cart.filter((itemId) => itemId === id).length;
  };

  const total = cart.reduce((sum, id) => {
    const item = orderItems.find((item) => item.id === id);

    return sum + (item?.price ?? 0);
  }, 0);

  return (
    <main className="min-h-screen bg-[#F5EBDD] text-[#2B211B]">
    <Header />

  
      {/* Header space */}
      <section className="bg-[#174A35] px-6 pb-16 pt-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A72C]">
            Order
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#F5EBDD] md:text-6xl">
            Choose your favorites.
          </h1>

          <p className="mt-5 max-w-xl text-[#F5EBDD]/70">
            Select your favorite dishes and build your order.
          </p>
          <button
  onClick={() => router.push("/my-orders")}
  className="mt-6 rounded-full border border-[#D4A72C] px-5 py-2.5 text-sm font-semibold text-[#D4A72C] transition hover:bg-[#D4A72C] hover:text-[#174A35]"
>
  View My Orders
</button>
        </div>
      </section>

      {/* Order */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Food items */}
          <div>
            <div className="grid gap-5 md:grid-cols-2">
              {orderItems.map((item) => {
                const quantity = getQuantity(item.id);

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-[#174A35]/10 bg-[#FFFDF8] p-6 transition-shadow duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <h2 className="text-xl font-semibold text-[#174A35]">
                          {item.name}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#2B211B]/60">
                          {item.description}
                        </p>
                      </div>

                      <span className="shrink-0 font-bold text-[#D4A72C]">
                        {item.price} ETB
                      </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      {quantity > 0 ? (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => removeFromOrder(item.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#174A35]/20 text-[#174A35] transition-colors hover:bg-[#174A35] hover:text-[#F5EBDD]"
                          >
                            −
                          </button>

                          <span className="min-w-5 text-center font-semibold">
                            {quantity}
                          </span>

                          <button
                            onClick={() => addToOrder(item.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#174A35] text-[#F5EBDD] transition-colors hover:bg-[#A9432E]"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToOrder(item.id)}
                          className="rounded-full bg-[#A9432E] px-5 py-2.5 text-sm font-semibold text-[#F5EBDD] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#933B28]"
                        >
                          Add to Order
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-2xl border border-[#174A35]/10 bg-[#FFFDF8] p-6 lg:sticky lg:top-28">
            <h2 className="text-xl font-bold text-[#174A35]">
              Your Order
            </h2>

            {cart.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-[#2B211B]/50">
                  Your order is empty.
                </p>

                <p className="mt-2 text-xs text-[#2B211B]/40">
                  Add something delicious to get started.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {orderItems.map((item) => {
                  const quantity = getQuantity(item.id);

                  if (quantity === 0) {
                    return null;
                  }

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 border-b border-[#174A35]/10 pb-4"
                    >
                      <div>
                        <p className="font-medium text-[#2B211B]">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-[#2B211B]/50">
                          {quantity} × {item.price} ETB
                        </p>
                      </div>

                      <p className="font-semibold text-[#174A35]">
                        {quantity * item.price} ETB
                      </p>
                    </div>
                  );
                })}

                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold text-[#2B211B]">
                    Total
                  </span>

                  <span className="text-xl font-bold text-[#A9432E]">
                    {total} ETB
                  </span>
                </div>

                <button
  className="mt-3 w-full rounded-full bg-[#174A35] px-6 py-3.5 text-sm font-semibold text-[#F5EBDD] transition-all duration-300 hover:bg-[#A9432E]"
  onClick={async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const items = orderItems
        .map((item) => {
          const quantity = getQuantity(item.id);

          if (quantity === 0) {
            return null;
          }

          return {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity,
          };
        })
        .filter(Boolean);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Could not place order."
        );
      }

      alert("Order placed successfully!");
    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);
      alert("Could not place order.");
    }
  }}
>
  Continue to Checkout
</button>
              </div>
            )}
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}