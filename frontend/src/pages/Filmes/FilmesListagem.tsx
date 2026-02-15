import React, {useCallback, useEffect, useState} from 'react';
import type {IFilme} from '../../models/Filme';
import {api} from '../../api';
import {Alert, Button, Container, Spinner, Table} from 'react-bootstrap';
import {Film, PencilSquare, TrashFill} from 'react-bootstrap-icons';
import {FilmesCadastro} from './FilmesCadastro.tsx';

export const FilmesListagem: React.FC = () => {
	const [filmes, setFilmes] = useState<IFilme[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchFilmes = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get('/filmes');
			setFilmes(response.data);
			setError(null);
		} catch (err) {
			console.error('Erro ao buscar filmes:', err);
			setError('Não foi possível carregar a lista de filmes.');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchFilmes();
	}, [fetchFilmes]);

	const handleExcluir = async (id: number) => {
		if (window.confirm(`Tem certeza que deseja excluir o filme com ID ${id}?`)) {
			try {
				await api.delete(`/filmes/${id}`);
				alert('Filme excluído com sucesso!');
				fetchFilmes();
			} catch (err) {
				console.error('Erro ao excluir filme:', err);
				alert('Erro ao excluir filme. Verifique o console.');
			}
		}
	};

	if (loading) {
		return (
			<Container className="mt-4">
				<FilmesCadastro loadLista={fetchFilmes} />
				<Container className="mt-5 text-center">
					<Spinner animation="border" role="status" />
					<p>Carregando filmes...</p>
				</Container>
			</Container>
		);
	}
	if (error) {
		return (
			<Container className="mt-4">
				<FilmesCadastro loadLista={fetchFilmes} />
				<Container className="mt-4">
					<Alert variant="danger">{error}</Alert>
				</Container>
			</Container>
		);
	}

	return (
		<Container className="mt-4">
			<FilmesCadastro loadLista={fetchFilmes} />
			<h2 className="my-4">
				<Film /> Filmes
			</h2>

			{filmes.length === 0 ? (
				<Alert variant="info">Nenhum filme cadastrado.</Alert>
			) : (
				<Table striped bordered hover responsive>
					<thead className="table-dark">
						<tr>
							<th>ID</th>
							<th>Título</th>
							<th>Gênero</th>
							<th>Duração (min)</th>
							<th>Classificação</th>
							<th>Datas Exibição</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{filmes.map((filme) => (
							<tr key={filme.id}>
								<td>{filme.id}</td>
								<td>{filme.titulo}</td>
								<td>{filme.genero}</td>
								<td>{filme.duracao}</td>
								<td>{filme.classificacao}</td>
								<td>
									{new Date(filme.dataInicioExibicao).toLocaleDateString('pt-BR')} à{' '}
									{new Date(filme.dataFinalExibicao).toLocaleDateString('pt-BR')}
								</td>
								<td>
									<Button
										variant="danger"
										size="sm"
										className="me-2"
										onClick={() => handleExcluir(filme.id)}
										title="Excluir Filme"
									>
										<TrashFill />
									</Button>
									<Button variant="warning" size="sm" title="Editar Filme">
										<PencilSquare />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Container>
	);
};
