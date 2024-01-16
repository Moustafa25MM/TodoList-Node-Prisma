import mongoose from 'mongoose';

const connectDB = async (mongoUrl: string): Promise<void> => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection failed', error);
  }
};

export default connectDB;
