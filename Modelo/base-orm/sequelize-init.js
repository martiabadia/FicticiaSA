// Configurar ORM Sequelize
const { Sequelize, DataTypes } = require("sequelize");

// Configuración de Sequelize con SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./.data/clientsDatabase.db" 
});

// Definir el modelo "clients"
const Clients = sequelize.define(
  // Nombre del modelo
    "clients",
  // Atributos del modelo
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fullName: {
        type: DataTypes.STRING(100), 
        allowNull: false,
        validate: {
        notNull: {
            args: true,
            msg: "El nombre completo es requerido"
            }
        }
    },

    identification: {
        type: DataTypes.STRING(20), 
        allowNull: false,
        unique: true, 
        validate: {
        notNull: {
            args: true,
            msg: "La identificación es requerida"
            }
        }
    },

    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
        notNull: {
            args: true,
            msg: "La edad es requerida"
        },
        min: {
            args: [18],
            msg: "La edad mínima es 18 años"
        },
        max: {
            args: [100],
            msg: "La edad máxima es 100 años"
        }
        }
    },

    gender: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
        notNull: {
            args: true,
            msg: "El género es requerido"
        },
        isIn: {
            args: [["Masculino", "Femenino", "Otro"]], // Valores permitidos para el campo "Género"
            msg: "El género debe ser Masculino, Femenino u Otro"
        }
        }
    },

    isActive: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true, // Por defecto el cliente está activo
        validate: {
        notNull: {
            args: true,
            msg: "El estado es requerido"
            }
        }
    },

    drives: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true, 
        validate: {
        notNull: {
            args: true,
            msg: "El campo 'Maneja' es requerido"
            }
        }
    },

    usesGlasses: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true,
        validate: {
        notNull: {
            args: true,
            msg: "El campo 'Usa lentes' es requerido"
        }
        }
    },

    isDiabetic: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true, 
        validate: {
        notNull: {
            args: true,
            msg: "El campo 'Diabético' es requerido"
        }
        }
    },

    otherDiseases: {
        type: DataTypes.STRING(200), 
        allowNull: true 
    }
    },
    {
        timestamps: false 
    }
);

// Exportar el modelo y la instancia de Sequelize
module.exports = {
    sequelize,
    Clients
};