const Message = require("../models/Message");
const User = require("../models/User");

const ENV = require("../lib/env")

const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
        
        res.status(200).json(filteredUsers)
    } catch (error) {
        
    }
}

const getChatPartner = () => {

}

const getMessageByUserId = () => {

}

const sendMessage = () => {

}


module.exports = {
  getAllContacts,
  getChatPartner,
  getMessageByUserId,
  sendMessage,
};