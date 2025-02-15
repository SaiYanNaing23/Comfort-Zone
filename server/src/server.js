import fs from 'fs';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import express from 'express';
import { createServer } from 'http';
import { connectDB } from './lib/db.js';
import fileUpload from 'express-fileupload';
import { clerkMiddleware } from '@clerk/express';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import statRoutes from './routes/stats.routes.js';
import songRoutes from './routes/songs.routes.js';
import { initializeSocket } from './lib/socket.js';
import adminRoutes from './routes/admin.routes.js';
import albumRoutes from './routes/albums.routes.js';
import chatbotRoutes from './routes/chatbot.routes.js';

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
const __dirname = path.resolve()

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(cors({
    origin : "http://localhost:3001",
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

// Clerk Middleware
app.use(clerkMiddleware())

// File Upload
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname, 'tmp'),
    createParentPath : true,
    limits : { fileSize : 100 * 1024 * 1024 }, // 10MB file size limit
}))

const tempDir = path.join(process.cwd(), 'tmp');
// cron jobs
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

// Routes
app.use("/api/auth", authRoutes );
app.use("/api/users", userRoutes );
app.use("/api/songs", songRoutes );
app.use("/api/stats", statRoutes );
app.use("/api/admin", adminRoutes );
app.use("/api/albums", albumRoutes );
app.use("/api/chat-bot", chatbotRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
	});
}

// Error Handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message : process.env.NODE_ENV === 'production' ? "Internal Server Error" : err.message});
} )

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});