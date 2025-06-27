const { ApolloServer } = require('apollo-server-lambda');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const User = require('./models/User');

// 🔌 MongoDB connection cache
let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) return;
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB error:', err);
    throw new Error('Failed to connect to MongoDB');
  }
}

// 🚀 Apollo Server setup with token-based context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ event }) => {
    await connectToMongoDB();

    // 🛠 Normalize header casing for AWS Gateway quirk
    const headers = event.headers || {};
    const authHeader = headers.Authorization || headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      console.warn('🔒 No token found in Authorization header');
      return {};
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.data._id);
      return { user };
    } catch (err) {
      console.error('🛑 Auth error:', err.message);
      return {};
    }
  },
});

// 🌐 Lambda export with open CORS for frontend access
exports.graphqlHandler = server.createHandler({
  cors: {
    origin: 'http://adopt-a-pet-frontend-2025.s3-website-us-east-1.amazonaws.com',
    credentials: false,
  },
});
