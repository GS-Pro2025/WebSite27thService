import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export interface ServiceAttributes {
  service_id?: number;
  name: string;
  description: string | null;
  base_price: number;
}

class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  public service_id!: number;
  public name!: string;
  public description!: string | null;
  public base_price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init(
  {
    service_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    base_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "services",
    timestamps: true,
  }
);

export default Service;
