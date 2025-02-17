const express = require("express");
const router = express.Router();
const { db } = require("../config/serverConfig");

router.get("/", async (req, res) => {
  const query = "SELECT * FROM conseilclasse";

  try {
    const [results] = await db.promise().query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;