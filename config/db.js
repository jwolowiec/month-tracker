import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI;

const connectToDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connect to database");
    } catch (e) {
        console.log(e);
    }
};

export default connectToDB;