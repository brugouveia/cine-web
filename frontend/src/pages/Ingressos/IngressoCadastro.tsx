import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type ISessao} from '../../models/Sessao';
import {type IFilme} from '../../models/Filme';
import {api} from '../../api';
import {Alert, Button, Col, Form, Row} from 'react-bootstrap';
import {type IIngresso, type IIngressoVendaForm, IngressoVendaSchema, TipoIngresso} from '../../models/Ingresso';

export function IngressoCadastro({sessaoId, loadLista}: {sessaoId: string; loadLista: () => void}) {
	const [sessao, setSessao] = useState<ISessao | null>(null);
	const [filme, setFilme] = useState<IFilme | null>(null);
	const [valores] = useState({inteira: 35.0, meia: 17.5});

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
		watch,
	} = useForm<IIngressoVendaForm>({
		resolver: zodResolver(IngressoVendaSchema),
		defaultValues: {
			sessaoId,
			valorUnitario: 0,
			tipo: undefined,
		},
	});

	const tipoSelecionado = watch('tipo');

	useEffect(() => {
		const fetchSessaoDetails = async () => {
			try {
				const sessaoRes = await api.get(`/sessoes/${sessaoId}`);
				const filmeRes = await api.get(`/filmes/${sessaoRes.data.filmeId}`);

				setSessao(sessaoRes.data);
				setFilme(filmeRes.data);
			} catch (error) {
				console.error('Erro ao buscar detalhes da sessão:', error);
			}
		};
		fetchSessaoDetails();
	}, [sessaoId]);

	useEffect(() => {
		if (tipoSelecionado === TipoIngresso.INTEIRA) {
			reset({...watch(), valorUnitario: valores.inteira});
		} else if (tipoSelecionado === TipoIngresso.MEIA) {
			reset({...watch(), valorUnitario: valores.meia});
		} else {
			reset({...watch(), valorUnitario: 0});
		}
	}, [tipoSelecionado, valores, reset, watch]);

	const onSubmit = async (data: IIngressoVendaForm) => {
		try {
			const ingressoPayload: Omit<IIngresso, 'id'> = {
				sessaoId: data.sessaoId,
				valorInteira: data.tipo === TipoIngresso.INTEIRA ? valores.inteira : valores.meia,
				valorMeia: valores.meia,
			};

			await api.post('/ingressos', {...ingressoPayload, tipo: data.tipo});
			alert('Ingresso vendido com sucesso!');
			loadLista();
			reset({sessaoId, valorUnitario: 0, tipo: undefined});
		} catch (error) {
			console.error('Erro ao vender ingresso:', error);
			alert('Erro ao vender ingresso.');
		}
	};

	return (
		<>
			<h2 className="mb-4">
				<i className="bi bi-ticket-perforated me-2"></i>
				Venda de Ingresso
			</h2>
			<Row className="mb-4">
				<Col md={12}>
					<Alert variant="primary">
						Sessão ID: <strong>{sessaoId}</strong>
						<br />
						Filme: <strong>{filme?.titulo || 'Carregando...'}</strong>
						<br />
						Horário:{' '}
						<strong>
							{sessao?.horarioExibicao
								? new Date(sessao.horarioExibicao).toLocaleString('pt-BR')
								: 'Carregando...'}
						</strong>
					</Alert>
				</Col>
			</Row>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Row className="mb-3">
					<Form.Group as={Col} md="4" controlId="tipo">
						<Form.Label>Tipo de Bilhete</Form.Label>
						<Form.Select isInvalid={!!errors.tipo} {...register('tipo')}>
							<option value="">Selecione o Tipo...</option>
							{Object.values(TipoIngresso).map((tipo) => (
								<option key={tipo} value={tipo}>
									{tipo} (
									{tipo === TipoIngresso.INTEIRA
										? `R$ ${valores.inteira.toFixed(2)}`
										: `R$ ${valores.meia.toFixed(2)}`}
									)
								</option>
							))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							{errors.tipo && errors.tipo.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="4" controlId="valorUnitario">
						<Form.Label>Valor (R$)</Form.Label>
						<Form.Control
							type="number"
							step="0.01"
							readOnly
							isInvalid={!!errors.valorUnitario}
							{...register('valorUnitario', {valueAsNumber: true})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.valorUnitario && errors.valorUnitario.message}
						</Form.Control.Feedback>
					</Form.Group>
				</Row>
				<Row>
					<Col className="text-end">
						<Button variant="success" type="submit" disabled={!tipoSelecionado}>
							Incluir Venda
						</Button>
					</Col>
				</Row>
				<hr />
			</Form>
		</>
	);
}
