// const express = require('express');
// const authMiddleware = require('./middleware/authMiddleware');
// const dotenv = require('dotenv');
// const cors = require('cors'); 

// const app = express();
// app.use(cors());



// // Appliquer le middleware d'authentification
// // app.use(authMiddleware);

// // Importer et utiliser les routes
// const loginRoutes = require('./routes/login');
// app.use('/secure', loginRoutes);

// const parentsRoutes = require('./routes/parents');
// app.use('/parents', parentsRoutes);

// // const classroomsRoutes = require('./routes/classrooms');
// // app.use('/tables/classrooms', classroomsRoutes);

// // const studentsRoutes = require('./routes/students');
// // app.use('/tables/students', studentsRoutes);

// module.exports = app;

const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');
const dotenv = require('dotenv');
const cors = require('cors'); 

const app = express();
app.use(cors());

// Ajouter ces deux lignes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Reste du code...
const loginRoutes = require('./routes/login');
app.use('/secure', loginRoutes);

const parentsRoutes = require('./routes/parents');
app.use('/parents', parentsRoutes);

const etablissementRoutes = require('./routes/etablissement');
app.use('/etablissement', etablissementRoutes);

module.exports = app;

