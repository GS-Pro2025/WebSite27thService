import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export interface MoveItemAttributes {
  item_id?: number;
  move_id: string;
  description: string;
  quantity: number;
  estimated_weight: number | null;
}

class MoveItem extends Model<MoveItemAttributes> implements MoveItemAttributes {
  public item_id!: number;
  public move_id!: string;
  public description!: string;
  public quantity!: number;
  public estimated_weight!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MoveItem.init(
  {
    item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    move_id: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      references: {
        model: "moves",
        key: "move_id",
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estimated_weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "move_items",
    timestamps: true,
  }
);

export default MoveItem;
