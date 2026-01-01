import express from 'express';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(express.json());
app.use(errorHandler);

app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'App is healthy.'
    })
});

export default app;