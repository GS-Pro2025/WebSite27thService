import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export interface MoveServiceAttributes {
  move_id: string;
  service_id: number;
  quantity: number;
}

class MoveService
  extends Model<MoveServiceAttributes>
  implements MoveServiceAttributes
{
  public move_id!: string;
  public service_id!: number;
  public quantity!: number;
}

MoveService.init(
  {
    move_id: {
      type: DataTypes.CHAR(12),
      primaryKey: true,
      allowNull: false,
      references: {
        model: "moves",
        key: "move_id",
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "services",
        key: "service_id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: "move_services",
    timestamps: false,
  }
);

export default MoveService;
