const express = require("express");
const router = express.Router();
const { db } = require("../config/serverConfig");

router.get("/", async (req, res) => {
  const query = "SELECT * FROM classeecole";

  try {
    const [results] = await db.promise().query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:IDEtablissement/:IDClasseEcole", async (req, res) => {
  const { IDEtablissement, IDClasseEcole } = req.params;
  
  const query = "SELECT * FROM classeecole WHERE IDEtablissement = ? AND IDClasseEcole = ?";

  try {
    const [results] = await db.promise().query(query, [IDEtablissement, IDClasseEcole]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: "Aucune classeecole trouvée pour cet IDEtablissement et IDClasseEcole." });
    }
    
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;