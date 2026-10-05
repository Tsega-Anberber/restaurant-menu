import { NextResponse } from "next/server";
import sequelize from "../../../lib/db";
import Order from "../../../lib/models/order";
import { createClient } from "../../../lib/supabase/server";
import MenuItem from "../../../lib/models/menu-item";
export async function GET() {
  try {
    // Check whether the customer is logged in
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in to view your orders.",
        },
        { status: 401 }
      );
    }

    // Connect to the database
    await sequelize.authenticate();

    // Get only this customer's orders
    const orders = await Order.findAll({
      where: {
        userId: user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not load your orders.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check whether the customer is logged in
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in to place an order.",
        },
        { status: 401 }
      );
    }

    // Connect to the database
    await sequelize.authenticate();

    // Read the order sent by the customer
    const body = await request.json();

const { items } = body;

if (!items || !Array.isArray(items) || items.length === 0) {
  return NextResponse.json(
    {
      success: false,
      message: "Your order is empty.",
    },
    { status: 400 }
  );
}

for (const item of items) {
  if (
    !item.id ||
    !Number.isInteger(Number(item.id)) ||
    !item.quantity ||
    !Number.isInteger(Number(item.quantity)) ||
    Number(item.quantity) <= 0
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid order item.",
      },
      { status: 400 }
    );
  }
}

const itemIds = items.map((item) => Number(item.id));

const menuItems = await MenuItem.findAll({
  where: {
    id: itemIds,
    available: true,
  },
});

if (menuItems.length !== itemIds.length) {
  return NextResponse.json(
    {
      success: false,
      message: "One or more menu items are unavailable.",
    },
    { status: 400 }
  );
}

let calculatedTotal = 0;

const verifiedItems = items.map((item) => {
  const menuItem = menuItems.find(
    (menuItem) => menuItem.id === Number(item.id)
  );

  if (!menuItem) {
    throw new Error("Menu item not found.");
  }

  const quantity = Number(item.quantity);
  const price = Number(menuItem.price);

  calculatedTotal += price * quantity;

  return {
    id: menuItem.id,
    name: menuItem.name,
    price,
    quantity,
  };
});

const order = await Order.create({
  userId: user.id,
  items: verifiedItems,
  total: calculatedTotal,
  status: "pending",
});
    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully.",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not create order.",
      },
      { status: 500 }
    );
  }
}