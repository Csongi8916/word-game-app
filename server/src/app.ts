import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(bodyParser.json());

app.get('/anagramma', (req, res) => {
  res.send('Endpoint test');
});

export default app;
