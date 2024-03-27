import express from 'express';
import { calcAnagram } from './anagram-service';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/anagram/', (req, res) => {
  console.log('Req: ' + req.body.content);
  const anagrams = calcAnagram(req.body.content);
  res.status(200).json({
    anagrams: anagrams
  });
});

app.post('/wordchain/', (req, res) => {
  console.log('Req src: ' + req.body.source);
  console.log('Req tar: ' + req.body.target);
  // TODO: Implement the algoritm
  res.status(200).json({
    wordChaines: ['nyerő', 'nyers', 'nyárs', 'nyári', 'gyári']
  });
});

app.listen(3000);
