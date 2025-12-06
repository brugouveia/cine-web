import type {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar as NavbarUI, Container, Nav} from 'react-bootstrap';

export const Navbar: FC = () => {
	return (
		<NavbarUI bg="dark" variant="dark" expand="lg" className="mb-4">
			<Container>
				<NavbarUI.Brand as={NavLink} to="/" className="navbar-brand fw-bold">
					🎬 CineWeb
				</NavbarUI.Brand>
				<NavbarUI.Toggle aria-controls="basic-navbar-nav" />
				<NavbarUI.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={NavLink} to="/filmes">
							<i className="bi bi-clapperboard me-1"></i>
							Filmes
						</Nav.Link>
						<Nav.Link as={NavLink} to="/salas">
							<i className="bi bi-house-door-fill me-1"></i>
							Salas
						</Nav.Link>
						<Nav.Link as={NavLink} to="/sessoes">
							<i className="bi bi-calendar-event me-1"></i>
							Sessões
						</Nav.Link>
					</Nav>
				</NavbarUI.Collapse>
			</Container>
		</NavbarUI>
	);
};
