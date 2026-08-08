const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  try {
    // Only configure custom DNS servers for Atlas SRV connections
    if (process.env.MONGO_URI && process.env.MONGO_URI.startsWith('mongodb+srv://')) {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
      } catch (e) {
        // Ignore if setServers is not supported
      }
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;




