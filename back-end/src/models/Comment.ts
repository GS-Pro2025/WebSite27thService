import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface CommentAttributes {
  id: number;
  userId: number;
  message: string;
  date: Date;
  rating?: number;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id' | 'rating'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public userId!: number;
  public message!: string;
  public date!: Date;
  public rating?: number;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: false,
  }
);

export default Comment;