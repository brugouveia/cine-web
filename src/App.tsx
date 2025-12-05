import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {Navbar} from './components/Navbar.tsx';
import {FilmesListagem} from './pages/Filmes/FilmesListagem.tsx';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Container>
				<Routes>
					<Route path="/" element={<div />} />
					<Route path="/filmes" element={<FilmesListagem />}></Route>
					<Route path="/salas" element={<div />} />
					<Route path="/psicologos" element={<div />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;
