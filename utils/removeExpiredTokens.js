import RefreshToken from "../models/RefreshToken.js";
import cron from "node-cron";

const removeExpiredTokens = async () => {
    try {
        await RefreshToken.deleteMany({
            $or: [
                {expireTime: {$lt: new Date()}},
                {expired: true}
            ]
        });
    } catch (e) {
        throw new Error(e);
    }
}

cron.schedule('0 * * * *', removeExpiredTokens);