const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB;

const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGO_URI}/${MONGO_DB}`);
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        throw err;
    }
};

module.exports = connectDB;
