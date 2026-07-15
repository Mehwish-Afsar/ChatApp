const dotenv = require("dotenv");
const express = require ('express')

const authRoutes = require ("./src/routes/auth.routes.js")
const messagesRoutes = require ("./src/routes/message.routes.js")

dotenv.config()

// Create an express application
const app =express()

app.use("/api/auth", authRoutes)
app.use("/api/messages" , messagesRoutes)

// Setting port
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT)
})