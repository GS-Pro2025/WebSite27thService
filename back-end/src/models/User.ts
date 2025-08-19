import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { UserRole } from "../enums/enums";

export interface UserAttributes {
  user_id?: number;
  full_name: string;
  email: string;
  password_hash: string | null;
  google_id: string | null;
  role: UserRole;
  phone_number: string | null;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public user_id?: number;
  public full_name!: string;
  public email!: string;
  public password_hash!: string | null;
  public google_id!: string | null;
  public role!: UserRole;
  public phone_number!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    google_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

export default User;
