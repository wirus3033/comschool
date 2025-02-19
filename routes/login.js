const express = require("express");
const router = express.Router();
const { db } = require("../config/serverConfig");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

router.post("/auth", async (req, res) => {
  console.log("Body reçu :", req.body);

  const { USER_Login, USER_MDP } = req.body;

  if (!USER_Login || !USER_MDP) {
    return res.status(400).json({ status: "error", message: "Champs requis." });
  }

  try {
    const [users] = await db
      .promise()
      .query("SELECT * FROM utilisateur WHERE USER_Login = ?", [USER_Login]);

    // Vérification du USER_Login
    if (users.length === 0) {
      return res
        .status(401)
        .json({ status: "error", message: "USER_Login error" });
    }

    // Vérification simple du USER_MDP
    if (USER_MDP !== users[0].USER_MDP) {
      return res
        .status(401)
        .json({ status: "error", message: "USER_MDP error" });
    }

    // Si tout est correct, générer un token
    const auth = users[0];
    const token = jwt.sign(
      { userId: auth.id, USER_Login: auth.USER_Login }, 
      'ton_secret_key', 
      { expiresIn: '5m' } 
    );

    // requette pour recuperer les information typeUser 
    const [userInfo] = await db
    .promise()
    .query("SELECT * FROM TypeUser WHERE IDTypeUser = ?", [users[0].IDTypeUser]);

    // requette pour recuperer l'idparent par rapport a l'id utilisateur
    const [idParent] = await db
  .promise()
  .query("SELECT IDPARENTS FROM parents WHERE IDUtilisateur = ?", [users[0].IDUtilisateur]);

  const parentId = idParent[0]?.IDPARENTS || null;

  // requette pour recuperer etablissement dans eleve avec l'idetablissement
  const [etablissement] = await db
  .promise()
  .query("SELECT * FROM eleve WHERE IDEtablissement = ?", [users[0].IDEtablissement]);


    console.log("Connexion réussie, token généré");
    return res.status(200).json({
      status: "success",
      message: "Réussite",
      token: token, 
      user: users[0],
      userInfo: userInfo[0],
      idParent: parentId,
      etablissement: etablissement[0],

    });

  } catch (error) {
    res.status(500).json({ status: "error", message: "Erreur serveur." });
  }
});


module.exports = router;
