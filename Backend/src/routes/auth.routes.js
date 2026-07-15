const express = require ("express")

const router = express.Router()

// in this file we file use router.get instaed of app.get
// endpoint
router.get('/signup', (req, res)=>{
    res.send("Signup endoint")
})

router.get('/login', (req, res)=>{
    res.send("Login endoint")
})

router.get('/logout', (req, res)=>{
    res.send("Logout endoint")
})

router.get('/update', (req, res)=>{
    res.send("Logout endoint")
})

module.exports = router;