import httpService from "./http.service.js";

const apiEndpoint = "http://localhost:3001/api/clients"; // Ruta base para las solicitudes

// Obtener el listado de todos los clientes
const getClients = async () => {
    const resultado = await httpService.get(apiEndpoint);
    return resultado.data;
};

// Crear un nuevo cliente
const createClient = async (clientData) => {
    const resultado = await httpService.post(apiEndpoint, clientData);
    return resultado.data;
};

// AModificar los datos de un cliente existente
const updateClient = async (id, clientData) => {
    const resultado = await httpService.put(`${apiEndpoint}/${id}`, clientData);
    return resultado.data;
};

// Eliminar un cliente
const deleteClient = async (identification) => {
    const resultado = await httpService.delete(`${apiEndpoint}/${identification}`);
    return resultado.data;
};

// Exportar las funciones anteriores como un objeto
const clientsService = {
    getClients,
    createClient,
    updateClient,
    deleteClient,
};

export default clientsService;