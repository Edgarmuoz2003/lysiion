const mongoose=require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("✅ MongoDB is connected");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit process with failure
    }
    
}



module.exports = connectDB;