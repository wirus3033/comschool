const express = require("express");
const router = express.Router();
const { db } = require("../config/serverConfig");

router.get("/", async (req, res) => {
  const query = "SELECT * FROM eleve";

  try {
    const [results] = await db.promise().query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:idParent", async (req, res) => {
    const { idParent } = req.params;
    
    const query = "SELECT * FROM Eleve WHERE IDPARENTS = ?";
  
    try {
      const [results] = await db.promise().query(query, [idParent]);
      
      if (results.length === 0) {
        return res.status(404).json({ message: "Aucun élève trouvé pour ce parent." });
      }
      
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });





module.exports = router;
