import { NextResponse } from "next/server";
import sequelize from "../../../../lib/db";
import MenuItem from "../../../../lib/models/menu-item";
import { createClient } from "../../../../lib/supabase/server";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
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

    const { id } = await context.params;
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

    const menuItem = await MenuItem.findByPk(Number(id));

    if (!menuItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Menu item not found.",
        },
        { status: 404 }
      );
    }

    await menuItem.update({
      name,
      description,
      price,
      category,
      image,
    });

    return NextResponse.json({
      success: true,
      menuItem,
    });
  } catch (error) {
    console.error("UPDATE MENU ITEM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not update menu item.",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
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

    const { id } = await context.params;

    const menuItem = await MenuItem.findByPk(Number(id));

    if (!menuItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Menu item not found.",
        },
        { status: 404 }
      );
    }

    await menuItem.destroy();

    return NextResponse.json({
      success: true,
      message: "Menu item deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE MENU ITEM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Could not delete menu item.",
      },
      { status: 500 }
    );
  }
}