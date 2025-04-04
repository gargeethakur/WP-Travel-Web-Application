const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import auth routes
const authRoutes = require('./routes/auth'); // ✅ Ensure the path is correct

// Use the auth routes under `/api/auth`
app.use('/api/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
