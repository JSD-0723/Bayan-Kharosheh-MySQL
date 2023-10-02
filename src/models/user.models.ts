import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.config";
import Book from "./book.models";

export interface IUser {
  id: number;
  email: string;
  password: string;
}

class User extends Model<IUser> {
  declare id: number;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "User",
    tableName: "users",
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.hasMany(Book, { as: "books", foreignKey: "userId" });
Book.belongsTo(User, { as: "users", foreignKey: "userId" });

export default User;
