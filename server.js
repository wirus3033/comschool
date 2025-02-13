const https = require('https');
const app = require('./app');
const { sslOptions } = require('./config/serverConfig');


const PORT = 4433;

// Lancement du serveur sécurisé
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`✅ Serveur sécurisé démarré sur https://192.168.88.12:${PORT}`);
});
