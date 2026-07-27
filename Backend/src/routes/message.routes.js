const express = require ("express")
const {getAllContacts, getChatPartner, getMessageByUserId, sendMessage} = require("../controllers/message.controllers");
const protectRoute = require("../middleware/authMiddleware");
const arcjetProtection = require("../middleware/arcjetMiddleware");

const router = express.Router()

router.use(arcjetProtection, protectRoute)

// endpoint
router.get('/contact', getAllContacts)
router.get('/chat', getChatPartner)
router.get('/:id', getMessageByUserId)
router.post('/send/:id', sendMessage)


module.exports = router;