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

// Appliquer le middleware d'authentification
// app.use(authMiddleware);

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

const eleveRoutes = require('./routes/eleve');
app.use('/eleve', eleveRoutes);

const matiersRoutes =require('./routes/matiere');
app.use('/matiere', matiersRoutes);

const niveauRoutes =require('./routes/niveau');
app.use('/niveau', niveauRoutes);

const  devoirsRoutes =require('./routes/devoirs');
app.use('/devoirs', devoirsRoutes);

const emploidutempsRoutes =require('./routes/emploi');
app.use('/emploi', emploidutempsRoutes);

const ouvrageRoutes =require('./routes/ouvrage');
app.use('/ouvrage', ouvrageRoutes);

const bulletinRoutes =require('./routes/bulletin');
app.use('/bulletin', bulletinRoutes);

const classeRoutes =require('./routes/classeecole');
app.use('/classe', classeRoutes);

const conseilRoutes =require('./routes/conseil');
app.use('/conseil', conseilRoutes);

const activiteRoutes =require('./routes/activite');
app.use('/activite', activiteRoutes);

const noteseleveRoutes =require('./routes/noteseleve');
app.use('/noteseleve', noteseleveRoutes);

const mesuredisciplinaireRoutes =require('./routes/mesuredisciplinaire');
app.use('/mesuredisciplinaire', mesuredisciplinaireRoutes);

const categorieetsRoutes =require('./routes/categorieets');
app.use('/categorieets', categorieetsRoutes);

const professeurRoutes =require('./routes/professeur');
app.use('/professeur', professeurRoutes);

module.exports = app;

