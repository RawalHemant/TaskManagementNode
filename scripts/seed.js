require('dotenv').config();
const connectDB = require('../src/config/db');
const User = require('../src/models/User');

const seed = async () => {
  try {
    await connectDB();
    const exists = await User.findOne({ email: 'admin@example.com' });
    if (!exists) {
      const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' });
      console.log('Admin user created:', admin.email);
    } else {
      console.log('Admin already exists');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();