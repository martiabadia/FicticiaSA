import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ListadoClients from "./ListadoClients";
import clientsService from "../services/clients.service";

const Clients = () => {
    const [lista, setLista] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const { register: registerNew, handleSubmit: handleSubmitNew, formState: { errors: errorsNew }, reset: resetNew } = useForm();

    // Obtengo la lista de clientes al cargar el componente
    useEffect(() => {
        fetchClients();
    }, []);

    // Obtener el listado de todos los clientes
    const fetchClients = async () => {
        try {
            const data = await clientsService.getClients();
            setLista(data);
        } catch (error) {
            console.error("Error al obtener los clientes:", error);
        }
    };

    // Buscar clientes por nombre (filtrado)
    const onSubmitSearch = async (data) => {
        try {
            const filtro = data.filtro.toLowerCase();
            const resultado = await clientsService.getClients();

            // Filtramos la lista basada en el nombre ingresado (filtro)
            const clientesFiltrados = resultado.filter(cliente =>
                cliente.fullName.toLowerCase().includes(filtro)
            );

            setLista(clientesFiltrados);
        } catch (error) {
            console.error("Error al buscar clientes:", error);
            alert("Error al buscar clientes");
        }
    };

        // Registrar un nuevo cliente
        const onSubmitRegister = async (data) => {
            try {
                await clientsService.createClient(data);
                alert("Cliente registrado correctamente");
                setShowRegisterModal(false); // Cierra el popUp
                resetNew(); // Resetea los campos del formulario
                fetchClients(); // Actualiza la lista de clientes luego del registro
            } catch (error) {
                console.error("Error al registrar el cliente:", error);
                alert("Error al registrar el cliente");
            }
        };
    

    // Abrir el popUp y editar un cliente
    const handleEdit = (cliente) => {
        setSelectedClient(cliente);
        setShowModal(true);

        // Cargar valores en el formulario
        setValue("fullName", cliente.fullName);
        setValue("identification", cliente.identification);
        setValue("age", cliente.age);
        setValue("gender", cliente.gender);
        setValue("isActive", cliente.isActive);
        setValue("drives", cliente.drives);
        setValue("usesGlasses", cliente.usesGlasses);
        setValue("isDiabetic", cliente.isDiabetic);
        setValue("otherDiseases", cliente.otherDiseases);
    };

    // Cerrar el popUp
    const closeModal = () => {
        setShowModal(false);
        setSelectedClient(null);
    };

    // Modificar datos del cliente
    const onSubmitEdit = async (data) => {
        try {
            console.log("Datos enviados para actualización:", data);
            const response = await clientsService.updateClient(selectedClient.id, data);
            console.log("Respuesta del servidor:", response);
            alert("Cliente actualizado correctamente");
            setShowModal(false);
    
            // Actualizar la lista después de la modificación
            fetchClients();
        } catch (error) {
            console.error("Error al actualizar el cliente:", error.response ? error.response.data : error.message);
            alert("Error al actualizar el cliente: " + (error.response ? error.response.data.message : error.message));
        }
    };

    const onDelete = async (identification) => {
        try {
            await clientsService.deleteClient(identification);
            alert("Cliente eliminado correctamente");
            fetchClients(); // Actualización de la lista luego de eliminar un cliente
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            alert("Error al eliminar el cliente");
        }
    };

    return (
        <div className="container">
            <h1>Clientes</h1>

            {/* Botón para registrar nuevo cliente */}
            <div className="d-flex justify-content-start">
                <button 
                    className="btn btn-success mb-3" 
                    onClick={() => setShowRegisterModal(true)}
                >
                    Registrar cliente
                </button>
            </div>

            {/* Formulario de búsqueda de clientes */}
            <div className="card mb-3">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmitSearch)}>
                        <div className="mb-3">
                            <label className="form-label">Filtro por nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register("filtro")}
                                placeholder="Ingrese el nombre del cliente"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Buscar</button>
                    </form>
                </div>
            </div>

            {/* Listado de clientes */}
            <ListadoClients lista={lista} onEdit={handleEdit} onDelete={onDelete}/>

            {/* PopUp de edición de clientes */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Cliente</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(onSubmitEdit)}>
                                <label>Nombre Completo:</label>
                                <input className="form-control" {...register("fullName", { 
                                    required: "El nombre es obligatorio", 
                                    pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, message: "No se permiten números ni símbolos" } 
                                    })} />
                                    {errors.fullName && <div className="text-danger">{errors.fullName.message}</div>}

                                    <label>Identificación:</label>
                                    <input className="form-control" type="number" {...register("identification", { 
                                    required: "La identificación es obligatoria", 
                                    validate: value => !lista.some(cliente => cliente.identification === value && cliente.id !== selectedClient?.id) || "La identificación ya existe" 
                                    })} />
                                    {errors.identification && <div className="text-danger">{errors.identification.message}</div>}

                                    <label>Edad:</label>
                                    <input className="form-control" type="number" {...register("age", { 
                                    required: "La edad es obligatoria", 
                                    min: { value: 18, message: "El cliente debe ser mayor de 18 años" }, 
                                    max: { value: 100, message: "El cliente debe ser menor de 100 años" }
                                    })} />
                                    {errors.age && <div className="text-danger">{errors.age.message}</div>}

                                    <label>Género:</label>
                                    <select className="form-control" {...register("gender")}>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>

                                    <label>¿Está Activo?</label>
                                    <select className="form-control" {...register("isActive")}>
                                        <option value={true}>Sí</option>
                                        <option value={false}>No</option>
                                    </select>

                                    <label>¿Maneja?</label>
                                    <select className="form-control" {...register("drives")}>
                                        <option value={true}>Sí</option>
                                        <option value={false}>No</option>
                                    </select>

                                    <label>¿Usa lentes?</label>
                                    <select className="form-control" {...register("usesGlasses")}>
                                        <option value={true}>Sí</option>
                                        <option value={false}>No</option>
                                    </select>

                                    <label>¿Es diabético?</label>
                                    <select className="form-control" {...register("isDiabetic")}>
                                        <option value={true}>Sí</option>
                                        <option value={false}>No</option>
                                    </select>

                                    <label>Otras Enfermedades:</label>
                                    <input className="form-control" {...register("otherDiseases")} />

                                    <button type="submit" className="btn btn-success mt-3">Guardar Cambios</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* popUp de registro de nuevos clientes */}
            {showRegisterModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Registrar Cliente</h5>
                                <button type="button" className="btn-close" onClick={() => setShowRegisterModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmitNew(onSubmitRegister)}>
                                    <label>Nombre Completo:</label>
                                    <input className="form-control" {...registerNew("fullName", { 
                                    required: "El nombre es obligatorio", 
                                    pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, message: "No se permiten números ni símbolos" } 
                                    })} />
                                    {errorsNew.fullName && <div className="text-danger">{errorsNew.fullName.message}</div>}

                                    <label>Identificación:</label>
                                    <input className="form-control" type="number" {...registerNew("identification", { 
                                    required: "La identificación es obligatoria", 
                                    validate: value => !lista.some(cliente => cliente.identification === value) || "La identificación ya existe" 
                                    })} />
                                    {errorsNew.identification && <div className="text-danger">{errorsNew.identification.message}</div>}

                                    <label>Edad:</label>
                                    <input className="form-control" type="number" {...registerNew("age", { 
                                    required: "La edad es obligatoria", 
                                    min: { value: 18, message: "El cliente debe ser mayor de 18 años" }, 
                                    max: { value: 100, message: "El cliente debe ser menor de 100 años" }
                                    })} />
                                    {errorsNew.age && <div className="text-danger">{errorsNew.age.message}</div>}

                                    <label>Género:</label>
                                    <select className="form-control" {...registerNew("gender")}>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>

                                    <label>¿Está Activo?</label>
                                    <select className="form-control" {...registerNew("isActive")}>
                                        <option value={true}>Sí</option>
                                        <option value={false}>No</option>
                                    </select>

                                    <label>¿Maneja?</label>
                                    <select className="form-control" {...registerNew("drives")}>
                                        <option value={true}>Sí</option>
                                        <option value={false}>No</option>
                                    </select>

                                    <label>¿Usa lentes?</label>
                                    <select className="form-control" {...registerNew("usesGlasses")}>
                                        <option value={true}>Sí</option>
                                        <option value={false}>No</option>
                                    </select>

                                    <label>¿Es diabético?</label>
                                    <select className="form-control" {...registerNew("isDiabetic")}>
                                        <option value={true}>Sí</option>
                                        <option value={false}>No</option>
                                    </select>

                                    <label>Otras Enfermedades:</label>
                                    <input className="form-control" {...registerNew("otherDiseases")} />

                                    <button type="submit" className="btn btn-success mt-3">Registrar Cliente</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clients;