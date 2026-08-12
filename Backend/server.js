const path = require("path");
const express = require("express");

const authRoutes = require("./src/routes/auth.routes.js");
const messagesRoutes = require("./src/routes/message.routes.js");
const connectDB = require("./src/lib/db.js");
const cors =require("cors")

const ENV = require("./src/lib/env.js");
const cookieParser = require("cookie-parser");
const {app, server} = require("./src/lib/socket.js")

const rootDir = path.resolve(__dirname, "..");

app.use(express.json({limit: "5mb"})) //req.body 
app.use(cookieParser())
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

const PORT = ENV.PORT || 3000;

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(rootDir, "Frontend", "dist")));

    app.use((_, res) => {
        res.sendFile(path.join(rootDir, "Frontend", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});

