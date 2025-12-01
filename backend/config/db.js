const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {});
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch(e) {
        console.log(`MongoDB connection failed. Error is : ${e.message}`);
    }
}

module.exports = connectDB;