require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const orders = await Order.find().populate('user');
  console.log('ORDERS IN DB:', JSON.stringify(orders, null, 2));
  process.exit(0);
});
