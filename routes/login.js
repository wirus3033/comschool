const express = require("express");
const router = express.Router();
const { db } = require("../config/serverConfig");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

router.post("/auth", async (req, res) => {
  console.log("Body reçu :", req.body);

  const { au_login, au_password } = req.body;

  if (!au_login || !au_password) {
    return res.status(400).json({ status: "error", message: "Champs requis." });
  }

  try {
    const [users] = await db
      .promise()
      .query("SELECT * FROM auth WHERE au_login = ?", [au_login]);

    // Vérification du au_login
    if (users.length === 0) {
      return res
        .status(401)
        .json({ status: "error", message: "au_login error" });
    }

    // Vérification simple du au_password
    if (au_password !== users[0].au_password) {
      return res
        .status(401)
        .json({ status: "error", message: "au_password error" });
    }

    // Si tout est correct, générer un token
    const auth = users[0];
    const token = jwt.sign(
      { userId: auth.id, au_login: auth.au_login }, 
      'ton_secret_key', 
      { expiresIn: '5m' } 
    );

    console.log("Connexion réussie, token généré");
    return res.status(200).json({
      status: "success",
      message: "Réussite",
      token: token, 
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: "Erreur serveur." });
  }
});


router.get("/user", async (req, res) => {
  const query = "SELECT * FROM auth";

  try {
    const [results] = await db.promise().query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
