const express = require('express');
const cors = require('cors');
const databaseConnection = require('./database');
const bookRoutes = require('./routes/book.route');


// Connect to MongoDB (connection options removed as they're deprecated in v4+)
databaseConnection();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!!' });

});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data storage (temporary database)
let items = [];
let currentId = 1;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log(`📦 Running without MongoDB (in-memory storage)`);
  console.log(`🔗 CORS enabled - Client can connect`);
  console.log(`📝 API endpoints available at /api/items`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

app.use('/api/books', bookRoutes);
app.use(express.json());


