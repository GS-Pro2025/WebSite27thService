import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";

export interface PersonAttributes {
  person_id?: number;
  user_id?: number | null;
  full_name: string;
  email: string;
  phone_number?: string | null;
  address?: string | null;
  additional_info?: string | null;
}

class Person extends Model<PersonAttributes> implements PersonAttributes {
  public person_id!: number;
  public user_id!: number | null;
  public full_name!: string;
  public email!: string;
  public phone_number!: string | null;
  public address!: string | null;
  public additional_info!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Person.init(
  {
    person_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "user_id",
      },
    },
    full_name: {
      type: DataTypes.STRING(180),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    additional_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "persons",
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

export default Person;
