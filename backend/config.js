const mongoose = require("mongoose");
const dns = require('dns');

async function DbConnection() {
  const DB_URL = process.env.MONGO_URI;

  // Set DNS servers
  dns.setServers(['8.8.8.8', '8.8.4.4']);

  try {
    await mongoose.connect(DB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4
    });
    console.log("DB Connected !!");
  } catch (error) {
    console.error("Connection Errors", error);
    process.exit(1);
  }
}

module.exports = DbConnection;