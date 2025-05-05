import express from "express";
import "dotenv/config";
import authRouter from "./routes/authRoutes.js";
import noteRouter from "./routes/noteRoutes.js";
import noteVersionRouter from "./routes/noteVersion.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("Hello World");
})


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/note-versions", noteVersionRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

