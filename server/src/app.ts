import express from 'express';
import bodyParser from 'body-parser';
import { calcAnagram } from './anagram-service';

const app = express();

app.use(bodyParser.json());

app.get('/test/:word', (req, res) => {
  const anagrams = calcAnagram(req.params.word);
  res.status(200).json({
    anagrams: anagrams
  });
});

app.listen(3000);
