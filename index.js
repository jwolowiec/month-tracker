import express from "express";
import "dotenv/config";
import connectToDB from "./config/db.js";
import homeRoutes from "./routes/homeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import monthlyCostRoutes from "./routes/monthlyCostRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import {errorHandler} from "./middleware/errorHandler.js";
import cookieParser from 'cookie-parser';
import {authMiddleware} from "./middleware/authMiddleware.js";
import {userMiddleware} from "./middleware/userMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import "./utils/removeExpiredTokens.js";

const port = process.env.PORT;
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

try {
    await connectToDB();
    app.use(userMiddleware.setUser);
    app.use("/", homeRoutes);
    app.use("/about", aboutRoutes);
    app.use("/auth", authRoutes);
    app.use("/costs", authMiddleware.authUser, monthlyCostRoutes);
    app.use("/calendar", authMiddleware.authUser, calendarRoutes);
    app.use("/user", authMiddleware.authUser, userRoutes);
} catch (e) {
    app.use("/*", (req, res, next) => {
        //res.sendStatus(503);
        next(e);
    });
}

app.use(errorHandler.notFound);
app.use(errorHandler.errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
