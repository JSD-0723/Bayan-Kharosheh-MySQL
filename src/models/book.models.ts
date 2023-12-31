import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.config';

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Book;
