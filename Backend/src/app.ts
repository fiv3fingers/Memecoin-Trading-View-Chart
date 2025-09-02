import express, { Express } from 'express';
import cors from "cors";
import chartRoutes from './routes/chartRoutes';

const app: Express = express();

const ORIGIN_URL = ['http://localhost:3000']
app.use(cors({
    origin: ORIGIN_URL,
    methods: ['GET', 'POST'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use('/', chartRoutes);

export default app;
