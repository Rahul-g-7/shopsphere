require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // Create Admin User
    const adminExists = await User.findOne({ email: 'admin@shopsphere.com' });
    let adminId;
    if (!adminExists) {
      const admin = await User.create({
        name: 'Admin User',
        email: 'admin@shopsphere.com',
        password: 'password123',
        role: 'admin'
      });
      adminId = admin._id;
      console.log('Admin user created (admin@shopsphere.com / password123)');
    } else {
      adminId = adminExists._id;
      console.log('Admin user already exists');
    }

    // Clear old data to prevent broken references
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});
    
    const products = [
      {
        name: 'Classic White T-Shirt',
        description: 'A comfortable, 100% cotton classic white t-shirt suitable for everyday wear. Perfect fit for all seasons.',
        price: 499,
        category: 'Clothing',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
        stock: 50,
        createdBy: adminId
      },
      {
        name: 'Minimalist Wristwatch',
        description: 'Sleek and minimalist wristwatch with a genuine leather band and water resistance up to 50 meters.',
        price: 2499,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
        stock: 15,
        createdBy: adminId
      },
      {
        name: 'Wireless Noise-Canceling Headphones',
        description: 'Premium over-ear headphones with active noise cancellation, rich bass, and 30-hour battery life.',
        price: 8999,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
        stock: 8,
        createdBy: adminId
      },
      {
        name: 'Ceramic Coffee Mug',
        description: 'Handcrafted ceramic coffee mug, perfect for your morning brew. Microwave safe and heat resistant.',
        price: 399,
        category: 'Home',
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80',
        stock: 120,
        createdBy: adminId
      },
      {
        name: 'Premium Leather Wallet',
        description: 'Genuine full-grain leather wallet with multiple card slots and a sleek, slim profile.',
        price: 1299,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
        stock: 35,
        createdBy: adminId
      },
      {
        name: 'Smart Fitness Band',
        description: 'Track your heart rate, sleep, and steps with this lightweight, waterproof fitness tracker.',
        price: 1999,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?w=500&q=80',
        stock: 40,
        createdBy: adminId
      },
      {
        name: 'Organic Cotton Hoodie',
        description: 'Cozy and warm organic cotton hoodie in heather gray. Ethically made and extremely soft.',
        price: 1499,
        category: 'Clothing',
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
        stock: 25,
        createdBy: adminId
      },
      {
        name: 'Wooden Desk Organizer',
        description: 'Keep your workspace tidy with this elegant bamboo desk organizer with multiple compartments.',
        price: 799,
        category: 'Home',
        imageUrl: 'https://images.unsplash.com/photo-1518544866330-9171f28b4d1b?w=500&q=80',
        stock: 60,
        createdBy: adminId
      },
      {
        name: 'Polarized Sunglasses',
        description: 'Classic wayfarer style sunglasses with UV400 protection and glare-reducing polarized lenses.',
        price: 899,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
        stock: 30,
        createdBy: adminId
      },
      {
        name: 'Bluetooth Portable Speaker',
        description: 'Compact wireless speaker delivering punchy bass and 360-degree sound. Waterproof design.',
        price: 2999,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
        stock: 20,
        createdBy: adminId
      }
    ];

    await Product.insertMany(products);
    console.log('Successfully seeded products with INR prices!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDatabase();
