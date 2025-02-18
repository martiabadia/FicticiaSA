import React from "react";
import "./App.css";
import { Container, Navbar } from "react-bootstrap"; // Importamos componentes de Bootstrap
import Clients from "./Components/Clients.jsx"; // Importamos el componente Clients

function App() {
    return (
        <div>
            {/* Navbar para la barra de navegación */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Seguros Ficticia S.A.</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>

            {/* Contenido principal */}
            <Container className="mt-4">
                <h1>Bienvenido al Sistema de Gestión de Clientes</h1>
                <p className="lead">
                    Gestioná la información de los clientes de Seguros Ficticia S.A.
                </p>

                {/* Componente ClientsList para mostrar la lista de clientes */}
                <Clients />
            </Container>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-4">
                <Container>
                    <p className="mb-0">
                        &copy; {new Date().getFullYear()} Seguros Ficticia S.A. - Todos los derechos reservados.
                    </p>
                </Container>
            </footer>
        </div>
    );
}

export default App;
