const express = require('express');
const router = express.Router();
module.exports = router;

// Terms Route
router.get("/terms", async (req, res) => {
  res.render("terms.ejs");
});

// Privacy Route
router.get("/privacy", async (req, res) => {
  try {
    res.render("privacy.ejs");
  } catch (err) {
    next(err);
  }
});