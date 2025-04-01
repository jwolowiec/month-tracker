import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    token: {type: String, required: true},
    deviceInfo: {type: String, required: true},
    expireTime: {
        type: Date,
        default: function () {
            return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        }
    },
    expired: {type: Boolean, default: false},
}, {timestamps: true});

export default mongoose.model("RefreshToken", refreshTokenSchema);