const express = require("express");
const router = express.Router();
const { db } = require("../config/serverConfig");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  console.log("Body reçu :", req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: "error", message: "Champs requis." });
  }

  try {
    const [users] = await db
      .promise()
      .query("SELECT * FROM user WHERE username = ?", [username]);

    // Vérification du username
    if (users.length === 0) {
      return res
        .status(401)
        .json({ status: "error", message: "username error" });
    }

    // Vérification simple du password
    if (password !== users[0].password) {
      return res
        .status(401)
        .json({ status: "error", message: "password error" });
    }

    // Si tout est correct
    console.log("Connexion reussie");
    return res.status(200).json({ status: "success", message: "reussite" });

  } catch (error) {
    res.status(500).json({ status: "error", message: "Erreur serveur." });
  }
});


router.get("/user", async (req, res) => {
  const query = "SELECT * FROM user";

  try {
    const [results] = await db.promise().query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
