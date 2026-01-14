import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import reservationRoutes from './routes/reservationRoutes';

const app = express();
const PORT = 3001; // Using a different port for the backend server

app.use(cors());
app.use(bodyParser.json());

app.use('/api', reservationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});