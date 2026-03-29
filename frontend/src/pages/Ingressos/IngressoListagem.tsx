import {useCallback, useEffect, useState} from 'react';
import {api} from '../../api';
import {Alert, Button, Container, Spinner, Table} from 'react-bootstrap';
import {TrashFill} from 'react-bootstrap-icons';
import {type IIngresso} from '../../models/Ingresso';

export function IngressoListagem({sessaoId, loadKey}: {sessaoId: string; loadKey: number}) {
	const [ingressos, setIngressos] = useState<IIngresso[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchIngressos = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get(`/ingressos?sessaoId=${sessaoId}`);
			setIngressos(response.data);
			setError(null);
		} catch (err) {
			console.error('Erro ao buscar ingressos:', err);
			setError('Não foi possível carregar a lista de ingressos.');
		} finally {
			setLoading(false);
		}
	}, [sessaoId, loadKey]);

	useEffect(() => {
		fetchIngressos();
	}, [fetchIngressos]);

	const handleExcluir = async (id: number) => {
		if (window.confirm(`Tem certeza que deseja estornar o Ingresso ID ${id}?`)) {
			try {
				await api.delete(`/ingressos/${id}`);
				fetchIngressos();
			} catch (err) {
				console.error('Erro ao estornar ingresso:', err);
				alert('Erro ao estornar ingresso.');
			}
		}
	};

	const calcularTotal = () => {
		return ingressos
			.reduce((total, ingresso) => {
				return total + ingresso.valorInteira;
			}, 0)
			.toFixed(2);
	};

	if (loading) {
		return (
			<Container className="mt-5 text-center">
				<Spinner animation="border" role="status" />
				<p>Carregando ingressos vendidos...</p>
			</Container>
		);
	}
	if (error) {
		return <Alert variant="danger">{error}</Alert>;
	}

	return (
		<>
			<h3 className="my-4">Ingressos Vendidos desta Sessão</h3>
			{ingressos.length === 0 ? (
				<Alert variant="info">Nenhum ingresso vendido para esta sessão.</Alert>
			) : (
				<>
					<Table striped bordered hover responsive size="sm">
						<thead className="table-dark">
							<tr>
								<th>ID</th>
								<th>Tipo</th>
								<th>Valor (R$)</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
							{ingressos.map((ingresso) => (
								<tr key={ingresso.id}>
									<td>{ingresso.id}</td>
									<td>
										{ingresso.tipo ||
											(ingresso.valorInteira === ingresso.valorMeia * 2 ? 'Inteira' : 'Meia')}
									</td>
									<td>R$ {ingresso.valorInteira.toFixed(2)}</td>
									<td>
										<Button
											variant="danger"
											size="sm"
											onClick={() => handleExcluir(ingresso.id)}
											title="Estornar Ingresso"
										>
											<TrashFill />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr className="table-info fw-bold">
								<td colSpan={2}>Total</td>
								<td>R$ {calcularTotal()}</td>
								<td></td>
							</tr>
						</tfoot>
					</Table>
				</>
			)}
		</>
	);
}
