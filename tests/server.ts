import express from 'express';
import path from 'path';

const app = express();
const port = 8008;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => res.send('You talking to me?'));

app.listen(port);
