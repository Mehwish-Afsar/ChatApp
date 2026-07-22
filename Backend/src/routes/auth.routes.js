const express = require ("express")
const {signup, login, logout} = require("../controllers/auth.controllers")

const router = express.Router()

// endpoint
router.post('/signup', signup )

router.post('/login', login )

router.post('/logout', logout)

router.get('/update', (req, res)=>{
    res.send("Logout endoint")
})

module.exports = router;