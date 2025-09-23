require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db.config');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api/auth', require('./routes/user.routes'));
app.use('/api/recipes', require('./routes/recipes.routes'));

app.get('/', (req, res) => res.send("Recipe API Backend Running ✅"));

const startServer = async () => {
  await connectDB();
  app.listen(3000, () => console.log(`🚀 Server running at http://localhost:3000`));
};

startServer();
