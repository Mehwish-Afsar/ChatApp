const mongoose = require('mongoose')
const User = require('./User')

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },

},
{timestamps: true}  //Created at Updated at

)

const Message = mongoose.model("Message", messageSchema)

module.exports = Message
