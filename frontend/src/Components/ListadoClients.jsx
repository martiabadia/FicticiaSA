import React from 'react';

const ListadoClients = ({ lista, onDelete, onEdit }) => {
    return (
        <div className="container mt-3">
            <h3>Listado de Clientes</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre Completo</th>
                        <th>Identificación</th>
                        <th>Edad</th>
                        <th>Género</th>
                        <th>Estado</th>
                        <th>¿Maneja?</th>
                        <th>¿Usa lentes?</th>
                        <th>¿Diabético?</th>
                        <th>Otras Enfermedades</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lista &&
                        lista.map((cliente, index) => (
                            <tr key={index}>
                                <td>{cliente.fullName}</td>
                                <td>{cliente.identification}</td>
                                <td>{cliente.age}</td>
                                <td>{cliente.gender}</td>
                                <td>{cliente.isActive ? 'Activo' : 'Inactivo'}</td>
                                <td>{cliente.drives ? 'Sí' : 'No'}</td>
                                <td>{cliente.usesGlasses ? 'Sí' : 'No'}</td>
                                <td>{cliente.isDiabetic ? 'Sí' : 'No'}</td>
                                <td>{cliente.otherDiseases || 'Ninguna'}</td>
                                <td>
                                    {/* Botón para editar */}
                                    <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(cliente)}>
                                        <i className="bi bi-pencil"></i> Editar
                                    </button>

                                    {/* Botón para eliminar */}
                                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(cliente.identification)}>
                                        <i className="bi bi-trash"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListadoClients;
