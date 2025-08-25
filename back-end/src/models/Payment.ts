import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { PaymentMethod, PaymentStatus } from "../enums/enums";

export interface PaymentAttributes {
  payment_id?: number;
  move_id: string;
  payment_method: PaymentMethod;
  amount: number;
  payment_status: PaymentStatus | null;
  is_partial: boolean | null;
}

class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
  public payment_id!: number;
  public move_id!: string;
  public payment_method!: PaymentMethod;
  public amount!: number;
  public payment_status!: PaymentStatus | null;
  public is_partial!: boolean | null;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Payment.init(
  {
    payment_id: {
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
    payment_method: {
      type: DataTypes.ENUM(...Object.values(PaymentMethod)),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM(...Object.values(PaymentStatus)),
      allowNull: true,
      defaultValue: PaymentStatus.PENDING,
    },
    is_partial: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "payments",
    timestamps: true,
  }
);

export default Payment;
