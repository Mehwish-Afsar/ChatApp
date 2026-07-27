const express = require ("express")
const {getAllContacts, getChatPartners, getMessageByUserId, sendMessage} = require("../controllers/message.controllers");
const protectRoute = require("../middleware/authMiddleware");

const router = express.Router()

// endpoint
router.get('/contact', protectRoute, getAllContacts)
// router.get('/chat', getChatPartners)
// router.get('/:id', getMessageByUserId)
// router.get('/send/:id', sendMessage)


module.exports = router;