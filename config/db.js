import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI;

const connectToDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connect to database");
    } catch (e) {
        console.error("Database connection failed:", e.message);
        throw e;
    }
};

export default connectToDB;