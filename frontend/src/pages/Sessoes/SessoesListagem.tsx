import {useCallback, useEffect, useState} from 'react';
import {type ISessao} from '../../models/Sessao';
import {type IFilme} from '../../models/Filme';
import {type ISala} from '../../models/Sala';
import {api} from '../../api';
import {Alert, Button, Container, Spinner, Table} from 'react-bootstrap';
import {CalendarEvent, TrashFill, PencilSquare, TicketPerforated} from 'react-bootstrap-icons';
import {SessoesCadastro} from './SessoesCadastro';
import {Link} from 'react-router-dom';

export function SessoesListagem() {
	const [sessoes, setSessoes] = useState<ISessao[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [editando, setEditando] = useState<ISessao | null>(null);

	const fetchSessoes = useCallback(async () => {
		try {
			setLoading(true);
			const [sessoesRes, filmesRes, salasRes] = await Promise.all([
				api.get('/sessoes'),
				api.get('/filmes'),
				api.get('/salas'),
			]);

			const filmesMap = new Map<number, IFilme>(filmesRes.data.map((filme: IFilme) => [filme.id, filme]));
			const salasMap = new Map<number, ISala>(salasRes.data.map((sala: ISala) => [sala.id, sala]));

			const sessoesComDetalhes: ISessao[] = sessoesRes.data.map((sessao: ISessao) => ({
				...sessao,
				filme: filmesMap.get(sessao.filmeId),
				sala: salasMap.get(sessao.salaId),
			}));

			setSessoes(sessoesComDetalhes);
			setError(null);
		} catch (err) {
			console.error('Erro ao buscar sessões e dependências:', err);
			setError('Não foi possível carregar a lista de sessões ou seus detalhes.');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchSessoes();
	}, [fetchSessoes]);

	const handleExcluir = async (id: number) => {
		if (window.confirm(`Tem certeza que deseja excluir a Sessão ID ${id}?`)) {
			try {
				await api.delete(`/sessoes/${id}`);
				alert('Sessão excluída com sucesso!');
				fetchSessoes();
			} catch (err) {
				console.error('Erro ao excluir sessão:', err);
				alert('Erro ao excluir sessão.');
			}
		}
	};

	const formatarHorario = (isoString: string) => {
		if (!isoString) return 'Data Inválida';
		const date = new Date(isoString);
		const dataFormatada = date.toLocaleDateString('pt-BR');
		const horaFormatada = date.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
		return `${dataFormatada} às ${horaFormatada}`;
	};

	const renderContent = () => {
		if (loading) {
			return (
				<Container className="mt-5 text-center">
					<Spinner animation="border" role="status" />
					<p>Carregando sessões...</p>
				</Container>
			);
		}

		if (error) {
			return (
				<Container className="mt-4">
					<Alert variant="danger">{error}</Alert>
				</Container>
			);
		}

		if (sessoes.length === 0) {
			return <Alert variant="info">Nenhuma sessão cadastrada.</Alert>;
		}

		return (
			<Table striped bordered hover responsive>
				<thead className="table-dark">
					<tr>
						<th>ID</th>
						<th>Filme</th>
						<th>Sala</th>
						<th>Horário</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{sessoes.map((sessao) => (
						<tr key={sessao.id}>
							<td>{sessao.id}</td>
							<td>{sessao.filme?.titulo || 'Filme não encontrado'}</td>
							<td>Sala {sessao.sala?.numero || 'não encontrada'}</td>
							<td>{formatarHorario(sessao.horarioExibicao)}</td>
							<td>
								<Link to={`/ingressos/venda/${sessao.id}`}>
									<Button variant="info" size="sm" className="me-2" title="Vender Ingresso">
										<TicketPerforated size={17} />
									</Button>
								</Link>

								<Button
									variant="danger"
									size="sm"
									className="me-2"
									onClick={() => handleExcluir(sessao.id)}
									title="Excluir Sessão"
								>
									<TrashFill />
								</Button>
								<Button
									variant="warning"
									size="sm"
									title="Editar Sessão"
									onClick={() => setEditando(sessao)}
								>
									<PencilSquare />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		);
	};

	return (
		<Container className="mt-4">
			<SessoesCadastro
				loadLista={fetchSessoes}
				sessaoEditando={editando}
				onCancelEdit={() => setEditando(null)}
			/>
			<h2 className="my-4">
				<CalendarEvent className="me-2" /> Sessões Agendadas
			</h2>
			{renderContent()}
		</Container>
	);
}
