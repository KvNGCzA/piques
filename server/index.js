import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.get('*', (req, res) => res.json({ message: 'server up' }));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
