import mongoose from 'mongoose';

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    let DB_URI = process.env.MONGO_URI;

    await mongoose.connect(DB_URI!).then((conn)=> console.log(`MongoDB Connected: ${conn.connection.host}`))
}

export default dbConnect;