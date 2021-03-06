/**
 * Import primary dependencies
 */
import express, { Application } from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";

/**
 * Import Routes
 */
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import threadRoutes from "./routes/thread.routes";
import messageRoutes from "./routes/message.routes";

/**
 * Declare express app
 */
const app: Application = express();

/**
 * Get the current working directory
 */
const CURRENT_WORKING_DIR = process.cwd();

/**
 * parse body params and attache them to req.body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

/**
 * Secure apps by setting various HTTP headers
 */
app.use(helmet());

/**
 * enable CORS - Cross Origin Resource Sharing
 */
app.use(cors());

/**
 * Compile to dist directory
 */
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

/**
 * Mount Routes
 *
 */
app.use("/", userRoutes);
app.use("/", threadRoutes);
app.use("/", authRoutes);
app.use("/", messageRoutes);

export default app;
