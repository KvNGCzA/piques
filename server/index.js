import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
console.log(port);
const app = express();

app.get('*', (req, res) => res.json('server up'))


app.listen(port, () => console.log(`Server started on port ${port}`))

export default app;
