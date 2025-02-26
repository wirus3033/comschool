// const https = require('https');
// const app = require('./app');
// const { sslOptions } = require('./config/serverConfig');


// const PORT = 4433;

// // Lancement du serveur sécurisé
// https.createServer(sslOptions, app).listen(PORT, () => {
//   console.log(`✅ Serveur sécurisé démarré sur https://192.168.88.12:${PORT}`);
// });

const http = require('http');
const app = require('./app');

const PORT = 3306; // Utilise le port 3000 ou un autre port que tu souhaites

// Lancement du serveur HTTP
http.createServer(app).listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://192.168.1.61:${PORT}`);
});
