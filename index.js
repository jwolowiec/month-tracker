import express from "express";
import "dotenv/config";
import connectToDB from "./config/db.js";
import homeRoutes from "./routes/homeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import monthlyCostRoutes from "./routes/monthlyCostRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import {errorHandler} from "./middleware/errorHandler.js";
import cookieParser from 'cookie-parser';
import {auth} from "./middleware/auth.js";
import {userMiddleware} from "./middleware/userMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const port = process.env.PORT;
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// try {
//     await connectToDB();
//     app.use("/", homeRoutes);
//     app.use("/costs", monthlyCostRoutes);
//     app.use("/calendar", calendarRoutes);
//     app.use("/author", authorRoutes);
//     app.use("/auth", authRoutes);
// } catch (e) {
//     app.use("/*", (req, res) => {
//         res.status(500).send("nie");
//     });
// }

await connectToDB();
app.use(userMiddleware.setUser);
app.use("/", homeRoutes);
app.use("/costs", auth.authUser, monthlyCostRoutes);
app.use("/calendar", auth.authUser, calendarRoutes);
app.use("/author", authorRoutes);
app.use("/auth", authRoutes);
app.use("/user", auth.authUser, userRoutes);

app.use(errorHandler.notFound);
app.use(errorHandler.errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
