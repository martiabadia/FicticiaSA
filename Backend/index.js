const express = require('express');
const cors = require('cors');
const app = express();
const clientRoutes = require("./routes/clientsRoutes.js"); // Importa las funciones de clientsRoutes.js
const { sequelize, Clients } = require("../Modelo/base-orm/sequelize-init.js");

// Sincronizo la BD
sequelize.sync({ force: true }) 
    .then(async () => {
        console.log("Base de datos sincronizada");

        // Inserto datos en mi BD
        await Clients.bulkCreate([
            {
                fullName: "Juan Pérez",
                identification: "123456789",
                age: 30,
                gender: "Masculino",
                isActive: true,
                drives: true,
                usesGlasses: false,
                isDiabetic: false,
                otherDiseases: "Ninguna"
            },
            {
                fullName: "María Gómez",
                identification: "987654321",
                age: 25,
                gender: "Femenino",
                isActive: true,
                drives: false,
                usesGlasses: true,
                isDiabetic: true,
                otherDiseases: "Hipertensión"
            },
            {
                fullName: "Paola Pérez",
                identification: "456789123",
                age: 21,
                gender: "Femenino",
                isActive: true,
                drives: true,
                usesGlasses: false,
                isDiabetic: false,
                otherDiseases: "Celiaquía"
            },
            {
                fullName: "Pedro Páez",
                identification: "222222222",
                age: 44,
                gender: "Masculino",
                isActive: false,
                drives: false,
                usesGlasses: true,
                isDiabetic: false,
                otherDiseases: "Ninguna"
            }
        ]);
        console.log("Datos insertados en la base de datos");
    })
    .catch((error) => {
        console.error("Error al sincronizar la base de datos:", error);
});


// Leo archivo de configuración (.env)
require('dotenv').config();

// Configuración de CORS
app.use(cors());

// Middleware para interpretar datos en formato JSON enviados en el body de las solicitudes HTTP
app.use(express.json());

// Usar las rutas de clientes
app.use("/api", clientRoutes);

app.get("/", (req, res) => {
    res.send("Backend funcionando correctamente");
});

// Inicio del servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

module.exports = app;