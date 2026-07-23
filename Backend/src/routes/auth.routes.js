const express = require ("express")
const {signup, login, logout, updateProfile} = require("../controllers/auth.controllers")
const protectRoute = require("../middleware/authMiddleware")
const arcjetProtection = require("../middleware/arcjetMiddleware")

const router = express.Router()

router.use(arcjetProtection)

// endpoint
router.post('/signup', signup )

router.post('/login', login )

router.post('/logout', logout)

router.put('/updateProfile', protectRoute, updateProfile)

router.put('/check', protectRoute, (req, res) => res.status(200).json(req.user))


module.exports = router;