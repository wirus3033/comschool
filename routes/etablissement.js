const express = require("express");
const router = express.Router();
const { db } = require("../config/serverConfig");

router.get("/", async (req, res) => {
  const query = "SELECT * FROM etablissement";

  try {
    const [results] = await db.promise().query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/etablissement/:id", async (req, res) => {
  const etablissementId = req.params.id;
  const query = "SELECT * FROM etablissement WHERE id = ?";

  try {
    const [results] = await db.promise().query(query, [etablissementId]);
    if (results.length === 0) {
      res.status(404).json({ error: "Etablissement non trouvé" });
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
