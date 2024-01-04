import mongoose from 'mongoose';

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    let DB_URI = process.env.MONGO_URI;

    await mongoose.connect(DB_URI!)
}

export default dbConnect;