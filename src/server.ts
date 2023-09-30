import express from 'express';
import bookRoutes from './routes/book.routes';
import userRoutes from './routes/user.routes';
import sequelize from './config/sequelize.config';

const app = express();

app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api', userRoutes);


sequelize.sync().then(() => {
  console.log('Database tables have been synchronized');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
