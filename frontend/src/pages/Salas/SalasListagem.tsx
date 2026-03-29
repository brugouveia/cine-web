import {useCallback, useEffect, useState} from 'react';
import type {ISala} from '../../models/Sala';
import {api} from '../../api';
import {Alert, Button, Container, Spinner, Table} from 'react-bootstrap';
import {PencilSquare, TrashFill, Tv} from 'react-bootstrap-icons';
import {SalasCadastro} from './SalasCadastro.tsx';

export function SalasListagem() {
	const [salas, setSalas] = useState<ISala[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [editando, setEditando] = useState<ISala | null>(null);

	const fetchSalas = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get('/salas');
			setSalas(response.data);
			setError(null);
		} catch (err) {
			console.error('Erro ao buscar salas:', err);
			setError('Não foi possível carregar a lista de salas.');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchSalas();
	}, [fetchSalas]);

	const handleExcluir = async (id: number) => {
		if (window.confirm(`Tem certeza que deseja excluir a Sala ID ${id}?`)) {
			try {
				await api.delete(`/salas/${id}`);
				alert('Sala excluída com sucesso!');
				fetchSalas();
			} catch (err) {
				console.error('Erro ao excluir sala:', err);
				alert('Erro ao excluir sala.');
			}
		}
	};

	if (loading) {
		return (
			<Container className="mt-4">
				<SalasCadastro loadLista={fetchSalas} onCancelEdit={() => setEditando(null)} />
				<Container className="mt-5 text-center">
					<Spinner animation="border" role="status" />
					<p>Carregando salas...</p>
				</Container>
			</Container>
		);
	}
	if (error) {
		return (
			<Container className="mt-4">
				<SalasCadastro loadLista={fetchSalas} onCancelEdit={() => setEditando(null)} />
				<Container className="mt-4">
					<Alert variant="danger">{error}</Alert>
				</Container>
			</Container>
		);
	}

	return (
		<Container className="mt-4">
			<SalasCadastro loadLista={fetchSalas} salaEditando={editando} onCancelEdit={() => setEditando(null)} />
			<h2 className="my-4">
				<Tv className="me-2" /> Salas
			</h2>

			{salas.length === 0 ? (
				<Alert variant="info">Nenhuma sala cadastrada.</Alert>
			) : (
				<Table striped bordered hover responsive>
					<thead className="table-dark">
						<tr>
							<th>ID</th>
							<th>Número da Sala</th>
							<th>Capacidade Máxima</th>
							<th>Tipo</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{salas.map((sala) => (
							<tr key={sala.id}>
								<td>{sala.id}</td>
								<td>{sala.numero}</td>
								<td>{sala.capacidade}</td>
								<td>{sala.tipo}</td>
								<td>
									<Button
										variant="danger"
										size="sm"
										className="me-2"
										onClick={() => handleExcluir(sala.id)}
										title="Excluir Sala"
									>
										<TrashFill />
									</Button>
									<Button
										variant="warning"
										size="sm"
										title="Editar Sala"
										onClick={() => setEditando(sala)}
									>
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
}
