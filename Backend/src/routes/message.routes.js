const express = require ("express")

const router = express.Router()

// endpoint
router.get('/send', (req, res)=>{
    res.send("Send Message Endpoint")
})


module.exports = router;