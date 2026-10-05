import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class MenuItem extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare price: number;
  declare category: string;
  declare image: string;
  declare available: boolean;
}

MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "MenuItem",
    tableName: "menu_items",
    timestamps: true,
  }
);

export default MenuItem;