const Message = require("../models/Message");
const User = require("../models/User");

const ENV = require("../lib/env");
const { cloudinary } = require("../lib/cloudinary");

const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {

    }
}

const getChatPartner = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]
        })

        const chatPartnerIds = [
  ...new Set(
    messages.map((msg) =>
      msg.senderId.toString() === loggedInUserId.toString()
        ? msg.receiverId.toString()
        : msg.senderId.toString()
    )
  ),
];

        const chatPartners = await User.find({
            _id: { $in: chatPartnerIds }
        }).select("-password")

        res.status(200).json(chatPartners)

    } catch (error) {
        console.log("Error with Chat Partners Controller", error.message)
        res.status(500).json({ error: "Invalid Server Error" })
    }

}

const getMessageByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in get message controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })

    }

}

const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageURL;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageURL = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL
        })

        await newMessage.save()

        // todo: Send message in real time using socket.io

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in Send Message Controller", error.message)
        res.status(500).json({ error: "Invalid Server Error" })
    }

}


module.exports = {
    getAllContacts,
    getChatPartner,
    getMessageByUserId,
    sendMessage,
};