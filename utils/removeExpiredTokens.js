import cron from "node-cron";
import {tokenService} from "../services.js";

const removeExpiredTokens = async () => {
    try {
        await tokenService.removeAllExpiredRefreshTokens();
    } catch (e) {
        throw new Error(e);
    }
}

cron.schedule('0 * * * *', removeExpiredTokens);