const mongoose = require("mongoose")
const ENV = require("./env")


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URL)
        console.log("MONGO DB Connected", conn.connection.host);

    } catch (error) {
        console.log("Error connection to MONDO DB:", error);
        // 1 status codee means fail and 0 means pass
        process.exit(1)


    }
}

module.exports = connectDB