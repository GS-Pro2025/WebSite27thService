import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { MoveStatus } from "../enums/enums";

export interface MoveAttributes {
  move_id?: string;
  person_id: number;
  status: MoveStatus;
  tentative_date: Date;
  confirmed_date: Date;
  origin_address: string;
  destination_address: string;
  total_cost: number | null;
}

class Move extends Model<MoveAttributes> implements MoveAttributes {
  public move_id?: string;
  public person_id!: number;
  public status!: MoveStatus;
  public tentative_date!: Date;
  public confirmed_date!: Date;
  public origin_address!: string;
  public destination_address!: string;
  public total_cost!: number | null;

  public readonly created_at!: Date;
  public readonly updatedAt!: Date;
}

Move.init(
  {
    move_id: {
      type: DataTypes.CHAR(12),
      primaryKey: true,
      allowNull: false,
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "persons",
        key: "person_id",
      },
    },
    status: {
      type: DataTypes.ENUM(...Object.values(MoveStatus)),
      allowNull: false,
      defaultValue: MoveStatus.PENDING,
    },
    tentative_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    confirmed_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    origin_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    destination_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    total_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: "moves",
    sequelize,
    timestamps: true,
  }
);

export default Move;
