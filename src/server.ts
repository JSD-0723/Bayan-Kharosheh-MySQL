import express from 'express';
import bookRoutes from './routes/book.routes';

const app = express();

app.use(express.json());

app.use('/api', bookRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
