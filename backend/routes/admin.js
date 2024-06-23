const express = require("express");
const router = express.Router();

//test api
router.get('/test', (req, res) => {
    console.log(req.ip)
    res.json('Admin route');
  });

module.exports = router;