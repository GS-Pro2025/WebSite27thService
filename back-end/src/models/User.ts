import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { UserRole } from "../enums/enums";

export interface UserAttributes {
  user_id?: number;
  email: string;
  password_hash: string | null;
  google_id: string | null;
  role: UserRole;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public user_id?: number;
  public email!: string;
  public password_hash!: string | null;
  public google_id!: string | null;
  public role!: UserRole;

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
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true,
    underscored: true,
  }
);

export default User;
