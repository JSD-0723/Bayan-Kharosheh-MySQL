import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "books_library",
  "root",
  "",
  {
    host: "localhost", 
    dialect: "mysql",
  }
);

export default sequelize;
