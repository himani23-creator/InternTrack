const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGO_URI is properly configured
    if (!process.env.MONGO_URI || process.env.MONGO_URI === 'your_full_atlas_connection_string_here') {
      console.log('\n⚠️  WARNING: MongoDB URI not configured!');
      console.log('📝 Please update backend/.env with your MongoDB Atlas connection string');
      console.log('📖 See SETUP_GUIDE.md for instructions\n');
      console.log('🔄 Server will continue running with limited functionality...\n');

      // Return without connecting - server will still start
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    console.log('📝 Please check your MongoDB URI in backend/.env');
    console.log('🔄 Server will continue running with limited functionality...\n');
    // Don't exit - let server run without DB for now
  }
};

module.exports = connectDB;
