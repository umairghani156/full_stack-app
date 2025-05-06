import express from "express";
import "dotenv/config";
import authRouter from "./routes/authRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
import noteVersionRouter from "./routes/noteVersion.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io"; 

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app); 

const io = new Server(server, { 
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5173","https://full-stack-app-8xhr.vercel.app"],
    credentials: true
}));


io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

app.set("io", io); 

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/note-versions", noteVersionRouter);

//Listen to port

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
