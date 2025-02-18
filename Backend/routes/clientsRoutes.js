const express = require("express");
const { Clients, sequelize } = require("../../Modelo/base-orm/sequelize-init.js"); // Importo el modelo Clients y sequelize
const { Op } = require("sequelize"); // Operadores de sequelize (para filtrado)

const router = express.Router();

// Obtengo todos los clientes filtrando por nombre
router.get("/clients", async (req, res) => {
    try {
        let filtro = req.query.filtro; 
        let whereCondition = {}; 

        console.log("Valor del filtro recibido:", filtro); 

        // Aplico el filtro (si existe) solo en el campo "fullName"
        if (filtro) {
            whereCondition = {
                fullName: { [Op.like]: `%${filtro}%` } 
            };
        }

        console.log("Condición de filtrado:", whereCondition); 

        // Obtengo todos los clientes que coincidan con las condiciones de filtrado
        const clients = await Clients.findAll({
            attributes: ["id", "fullName", "identification", "age", "gender", "isActive", "drives", "usesGlasses", "isDiabetic", "otherDiseases"],
            where: whereCondition, 
        });

        console.log("Clientes filtrados:", clients);
        res.json(clients); // Devuelve los clientes filtrados en json
    } catch (error) {
        console.error("Error al obtener clientes:", error); 
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});


// Creación de un nuevo cliente con el metodo POST
router.post("/clients", async (req, res) => {
    try {
        const newClient = await Clients.create(req.body);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Modificación de los datos de un cliente con el método PUT
router.put("/clients/:id", async (req, res) => {
    try {
        const client = await Clients.findByPk(req.params.id);
        if (!client) {
            res.status(404).json({ message: "Cliente no encontrado" });
            return;
        }

        // Actualización de los campos
        client.fullName = req.body.fullName;
        client.identification = req.body.identification;
        client.age = req.body.age;
        client.gender = req.body.gender;
        client.isActive = req.body.isActive;
        client.drives = req.body.drives;
        client.usesGlasses = req.body.usesGlasses;
        client.isDiabetic = req.body.isDiabetic;
        client.otherDiseases = req.body.otherDiseases;

        await client.save(); // Guardado de los datos en la base de datos
        res.json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminación de un cliente de la base de datos basándonos en el id 
router.delete("/clients/:identification", async (req, res) => {
    try {
        const identification = req.params.identification; // Obtenego el número de identificación como parámetro

        // Busco al cliente por su número de ID
        const client = await Clients.findOne({
            where: { identification: identification }
        });

        // Si no encuentro el cliente, devuelve un error 404
        if (!client) {
            res.status(404).json({ message: "Cliente no encontrado" });
            return;
        }

        // Elimino el cliente de la base de datos
        await client.destroy();

        // Devolver una respuesta exitosa sin contenido (204)
        res.status(204).send();
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;