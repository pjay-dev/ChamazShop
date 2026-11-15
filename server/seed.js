const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  { name: 'Fresh Tomatoes', price: 2.50, image: '🍅', category: 'Vegetables', stock: 50, description: 'Ripe, juicy tomatoes, perfect for stews, salads and sauces.' },
  { name: 'Cooking Oil 2L', price: 8.99, image: '🛢️', category: 'Groceries', stock: 40, description: 'Pure vegetable cooking oil in a 2 litre bottle for frying and baking.' },
  { name: 'Bread Loaf', price: 1.50, image: '🍞', category: 'Bakery', stock: 60, description: 'Freshly baked white bread loaf, sliced and ready to eat.' },
  { name: 'Chicken Braai Pack', price: 12.99, image: '🍗', category: 'Meat', stock: 25, description: 'Marinated chicken pieces, ready for the braai.' },
  { name: 'Onions 1kg', price: 1.20, image: '🧅', category: 'Vegetables', stock: 80, description: 'One kilogram of firm, fresh onions.' },
  { name: 'Rice 2kg', price: 4.50, image: '🍚', category: 'Groceries', stock: 45, description: 'Long grain white rice in a 2 kilogram pack.' },
  { name: 'Eggs x6', price: 2.00, image: '🥚', category: 'Dairy', stock: 70, description: 'A tray of six fresh eggs.' },
  { name: 'Milk 1L', price: 1.80, image: '🥛', category: 'Dairy', stock: 55, description: 'Fresh full cream milk, 1 litre.' },
  { name: 'Beef Steak', price: 15.99, image: '🥩', category: 'Meat', stock: 20, description: 'Quality beef steak cuts, great for grilling or frying.' },
  { name: 'Spinach Bunch', price: 0.80, image: '🥬', category: 'Vegetables', stock: 90, description: 'A fresh bunch of green spinach, picked this week.' },
  { name: 'Maize Meal 5kg', price: 6.50, image: '🌽', category: 'Groceries', stock: 35, description: 'Fine maize meal for sadza, 5 kilogram bag.' },
  { name: 'Butter 250g', price: 3.20, image: '🧀', category: 'Dairy', stock: 30, description: 'Creamy dairy spread, 250 gram pack.' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
};

seed();