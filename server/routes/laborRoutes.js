const express = require("express");
const router = express.Router();
const { registerLabor } = require("../controllers/laborController");

router.post("/register", registerLabor);

module.exports = router;
