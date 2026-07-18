const dotenv = require("dotenv");
const path = require("path");
const express = require("express");

const authRoutes = require("./src/routes/auth.routes.js");
const messagesRoutes = require("./src/routes/message.routes.js");

dotenv.config();

const app = express();

const rootDir = path.resolve(__dirname, "..");

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(rootDir, "Frontend", "dist")));

    app.use((_, res) => {
        res.sendFile(path.join(rootDir, "Frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
