"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function AdminDashboard() {
  const supabase = createClient();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("/food-1.jpg");
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  useEffect(() => {
  const checkAuthAndLoadMenu = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/admin/login";
      return;
    }

    try {
      const response = await fetch("/api/menu");
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Could not load menu items."
        );
      }

      setMenuItems(data.menuItems);
    } catch (error) {
      console.error("LOAD MENU ITEMS ERROR:", error);
    }
  };

  checkAuthAndLoadMenu();
}, []);
const handleLogout = async () => {
  await supabase.auth.signOut();
  window.location.href = "/admin/login";
};
const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!name || !description || !price || !category || !image) {
    return;
  }

  if (editingId !== null) {
  try {
    const response = await fetch(`/api/menu/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price: Number(price),
        category,
        image,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Could not update menu item.");
    }

    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === editingId ? data.menuItem : item
      )
    );

    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage("/food-1.jpg");

    setSuccessMessage("Menu item updated successfully!");

setTimeout(() => {
  setSuccessMessage("");
}, 3000);
  } catch (error) {
    console.error("UPDATE MENU ITEM ERROR:", error);
    alert("Could not update menu item.");
  }

  return;

  }

  try {
    const response = await fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price: Number(price),
        category,
        image,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Could not create menu item.");
    }

    setMenuItems((currentItems) => [
      ...currentItems,
      data.menuItem,
    ]);

    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setImage("/food-1.jpg");

   setSuccessMessage("Menu item added successfully!");

setTimeout(() => {
  setSuccessMessage("");
}, 3000);
  } catch (error) {
    console.error("ADD MENU ITEM ERROR:", error);
    alert("Could not add menu item.");
  }
};

  const handleEdit = (item: (typeof menuItems)[number]) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(String(item.price));
    setCategory(item.category);
    setImage(item.image);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this menu item?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(`/api/menu/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Could not delete menu item.");
    }

    setMenuItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );

    alert("Menu item deleted successfully!");
  } catch (error) {
    console.error("DELETE MENU ITEM ERROR:", error);
    alert("Could not delete menu item.");
  }
};

  const totalItems = menuItems.length;

  const categories = new Set(
    menuItems.map((item) => item.category)
  ).size;

  const averagePrice =
    menuItems.length > 0
      ? Math.round(
          menuItems.reduce((sum, item) => sum + item.price, 0) /
            menuItems.length
        )
      : 0;

  return (
    <main className="min-h-screen bg-[#F5F3EF] text-[#24221F]">
      {successMessage && (
  <div className="fixed right-6 top-6 z-50 rounded-2xl border border-[#D8E8DE] bg-white px-5 py-4 shadow-xl shadow-black/10">
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E5F2E9] text-[#174A35]">
        ✓
      </div>

      <div>
        <p className="text-sm font-semibold text-[#174A35]"> 
          Success
        </p>

        <p className="mt-0.5 text-sm text-[#716D67]">
          {successMessage}
        </p>
      </div>
    </div>
  </div>
)}
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-[#E3DED5] bg-[#24221F] text-white lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-7 py-7">
            <a href="/" className="text-xl font-bold">
              My Restaurant
            </a>

            <p className="mt-1 text-xs text-white/50">
              Admin Portal
            </p>
          </div>

          <nav className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Management
            </p>

            <a
              href="#"
              className="mb-1 flex items-center rounded-xl bg-white/10 px-3 py-3 text-sm font-medium"
            >
              Dashboard
            </a>

            <a
              href="#menu"
              className="mb-1 flex items-center rounded-xl px-3 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              Menu
            </a>

            <a
              href="#"
              className="mb-1 flex items-center rounded-xl px-3 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              Orders
            </a>

            <a
              href="#"
              className="flex items-center rounded-xl px-3 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              Settings
            </a>
          </nav>

          <div className="border-t border-white/10 p-5">
            <a
              href="/"
              className="text-sm text-white/50 transition hover:text-white"
            >
              ← View restaurant
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1">

          {/* Top Bar */}
          <header className="border-b border-[#E3DED5] bg-[#F5F3EF]">
            <div className="flex items-center justify-between px-6 py-5 md:px-10">
              <div>
                <p className="text-sm text-[#817B73]">
                  Admin Dashboard
                </p>

                <h1 className="text-2xl font-bold md:text-3xl">
                  Menu Management
                </h1>
              </div>

            <div className="flex items-center gap-3">
  <a
    href="/"
    className="rounded-xl border border-[#D9D3C9] bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-[#F0ECE5]"
  >
    View Menu
  </a>

  <button
    type="button"
    onClick={handleLogout}
    className="rounded-xl bg-[#24221F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3A3732]"
  >
    Sign out
  </button>
</div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <div className="rounded-2xl border border-[#E3DED5] bg-white p-5">
                <p className="text-sm text-[#817B73]">
                  Menu Items
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {totalItems}
                </p>

                <p className="mt-1 text-xs text-[#A29C93]">
                  Total items currently listed
                </p>
              </div>

              <div className="rounded-2xl border border-[#E3DED5] bg-white p-5">
                <p className="text-sm text-[#817B73]">
                  Categories
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {categories}
                </p>

                <p className="mt-1 text-xs text-[#A29C93]">
                  Active menu categories
                </p>
              </div>

              <div className="rounded-2xl border border-[#E3DED5] bg-white p-5">
                <p className="text-sm text-[#817B73]">
                  Average Price
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {averagePrice}
                  <span className="ml-1 text-sm font-medium">
                    ETB
                  </span>
                </p>

                <p className="mt-1 text-xs text-[#A29C93]">
                  Across all menu items
                </p>
              </div>

            </div>

            <div className="grid gap-8 xl:grid-cols-[380px_1fr]">

              {/* Add / Edit */}
              <section className="h-fit rounded-2xl border border-[#E3DED5] bg-white p-6">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A66A3F]">
                    {editingId !== null
                      ? "Edit item"
                      : "New item"}
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    {editingId !== null
                      ? "Update menu item"
                      : "Add to menu"}
                  </h2>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Item name
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Chicken Burger"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-[#D9D3C9] bg-[#FCFBF8] px-4 py-3 outline-none transition focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Category
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Burgers"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-[#D9D3C9] bg-[#FCFBF8] px-4 py-3 outline-none transition focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Price
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        placeholder="450"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full rounded-xl border border-[#D9D3C9] bg-[#FCFBF8] px-4 py-3 pr-14 outline-none transition focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/10"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#9B958B]">
                        ETB
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Description
                    </label>

                    <textarea
                      placeholder="Describe the dish..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full resize-none rounded-xl border border-[#D9D3C9] bg-[#FCFBF8] px-4 py-3 outline-none transition focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/10"
                    />
                  </div>
                  <div>
  <label className="mb-1.5 block text-sm font-medium">
    Image
  </label>

  <input
    type="text"
    placeholder="/food-1.jpg"
    value={image}
    onChange={(e) => setImage(e.target.value)}
    className="w-full rounded-xl border border-[#D9D3C9] bg-[#FCFBF8] px-4 py-3 outline-none transition focus:border-[#A66A3F] focus:ring-2 focus:ring-[#A66A3F]/10"
  />

  <p className="mt-1.5 text-xs text-[#A29C93]">
    Example: /food-1.jpg
  </p>
</div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#24221F] px-4 py-3.5 font-medium text-white transition hover:bg-[#3A3732]"
                  >
                    {editingId !== null
                      ? "Update Menu Item"
                      : "Add Menu Item"}
                  </button>

                  {editingId !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setName("");
                        setDescription("");
                        setPrice("");
                        setCategory("");
                      }}
                      className="w-full rounded-xl border border-[#D9D3C9] px-4 py-3 text-sm font-medium text-[#716D67] transition hover:bg-[#F5F3EF]"
                    >
                      Cancel editing
                    </button>
                  )}
                </form>
              </section>

              {/* Menu List */}
              <section id="menu">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A66A3F]">
                      Your menu
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      Current items
                    </h2>
                  </div>

                  <span className="text-sm text-[#817B73]">
                    {totalItems} items
                  </span>
                </div>

                <div className="space-y-3">
                  {menuItems.map((item) => (
                    <article
                      key={item.id}
                      className="group rounded-2xl border border-[#E3DED5] bg-white p-5 transition hover:border-[#C9C1B6] hover:shadow-sm"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              {item.name}
                            </h3>

                            <span className="rounded-full bg-[#F3EEE6] px-3 py-1 text-xs font-medium text-[#80654F]">
                              {item.category}
                            </span>
                          </div>

                          <p className="mt-2 max-w-xl text-sm leading-6 text-[#817B73]">
                            {item.description}
                          </p>

                          <p className="mt-3 font-bold text-[#A66A3F]">
                            {item.price} ETB
                          </p>
                        </div>

                        <div className="flex shrink-0 gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="rounded-xl border border-[#D9D3C9] px-4 py-2.5 text-sm font-medium transition hover:bg-[#F5F3EF]"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>

                      </div>
                    </article>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}