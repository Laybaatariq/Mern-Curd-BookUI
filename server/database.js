const mongoose = require('mongoose');

const databaseConnection = async () => {
    try {
        console.log("🔄 Connecting to MongoDB...");
        
        // Connection options for better configuration
        const options = {
            serverSelectionTimeoutMS: 10000, // Increased to 10 seconds for better chance
            socketTimeoutMS: 45000,
            family: 4,
            connectTimeoutMS: 10000, // Added connection timeout
            retryWrites: true,
            retryReads: true
        };
        
        // Connect to MongoDB (database name: bookstore)
        await mongoose.connect("mongodb://localhost:27017/bookstore", options);
        
        // Check if connection is successful
        if (mongoose.connection.readyState === 1) {
            console.log("✅ MongoDB connected successfully to 'bookstore' database");
            console.log(`📊 Host: ${mongoose.connection.host}`);
            console.log(`📚 Database: ${mongoose.connection.name}`);
        }
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected - attempting to reconnect...');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected successfully');
        });
        
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        console.log("📦 Running without MongoDB (in-memory storage)");
        console.log("💡 To fix MongoDB connection:");
        console.log("   1. Make sure MongoDB is installed");
        console.log("   2. Start MongoDB service: net start MongoDB");
        console.log("   3. Or run: mongod --dbpath=C:\\data\\db");
        // Don't exit - allow app to continue with in-memory storage
    }
};

module.exports = databaseConnection;