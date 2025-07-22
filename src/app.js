const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // For parsing application/json

app.get('/', (req, res) => {
  res.send('Hello from Backend API!');
});

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});