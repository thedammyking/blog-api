import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Node.js and tsx!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
