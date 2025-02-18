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

router.get("/:IDEtablissement", async (req, res) => {
  const { IDEtablissement } = req.params;
  
  const query = "SELECT * FROM etablissement WHERE IDEtablissement = ?";

  try {
    const [results] = await db.promise().query(query, [IDEtablissement]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: "Aucun etablissement trouvé pour ce IDEtablissement." });
    }
    
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
