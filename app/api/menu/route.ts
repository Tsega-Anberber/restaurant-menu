import { NextResponse } from "next/server";
import sequelize from "../../../lib/db";
import MenuItem from "../../../lib/models/menu-item";
import { createClient } from "../../../lib/supabase/server";

export async function GET() {
  try {
    await sequelize.authenticate();

    const menuItems = await MenuItem.findAll({
      order: [["category", "ASC"], ["name", "ASC"]],
    });

    return NextResponse.json({
      success: true,
      menuItems,
    });
  } catch (error) {
    console.error("MENU API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not fetch menu items.",
      },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized.",
    },
    { status: 401 }
  );
}

if (user.app_metadata?.role !== "admin") {
  return NextResponse.json(
    {
      success: false,
      message: "Forbidden.",
    },
    { status: 403 }
  );
}

    await sequelize.authenticate();

    const body = await request.json();

    const { name, description, price, category, image } = body;

    if (!name || !description || !price || !category || !image) {
      return NextResponse.json(
        {
          success: false,
          message: "All menu item fields are required.",
        },
        { status: 400 }
      );
    }

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      image,
      available: true,
    });

    return NextResponse.json(
      {
        success: true,
        menuItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE MENU ITEM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not create menu item.",
      },
      { status: 500 }
    );
  }
}