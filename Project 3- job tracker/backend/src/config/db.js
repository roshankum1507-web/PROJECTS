const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jobtrackpro';
    const connection = await mongoose.connect(connectionString);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
