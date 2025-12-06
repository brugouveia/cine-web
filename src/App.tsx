import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {Navbar} from './components/Navbar.tsx';
import {FilmesListagem} from './pages/Filmes/FilmesListagem.tsx';
import {SalasListagem} from './pages/Salas/SalasListagem.tsx';

function App() {
	return (
		<BrowserRouter>
			<div className="bg-body-tertiary min-vh-100">
				<Navbar />
				<Container>
					<Routes>
						<Route path="/" element={<div />} />
						<Route path="/filmes" element={<FilmesListagem />} />
						<Route path="/salas" element={<SalasListagem />} />
						<Route path="/sessoes" element={<div />} />
					</Routes>
				</Container>
			</div>
		</BrowserRouter>
	);
}

export default App;
