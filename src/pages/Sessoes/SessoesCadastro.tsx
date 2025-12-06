import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type ISessaoForm, SessaoSchema} from '../../models/Sessao';
import {type IFilme} from '../../models/Filme';
import {type ISala} from '../../models/Sala';
import {api} from '../../api';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {useEffect, useState} from 'react';

export function SessoesCadastro({loadLista}: {loadLista: () => void}) {
	const [filmes, setFilmes] = useState<IFilme[]>([]);
	const [salas, setSalas] = useState<ISala[]>([]);

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<ISessaoForm>({
		resolver: zodResolver(SessaoSchema.omit({id: true})),
	});

	useEffect(() => {
		const fetchDependencies = async () => {
			try {
				const [filmesRes, salasRes] = await Promise.all([api.get('/filmes'), api.get('/salas')]);
				setFilmes(filmesRes.data);
				setSalas(salasRes.data);
			} catch (error) {
				console.error('Erro ao carregar dependências:', error);
				alert('Erro ao carregar filmes e salas.');
			}
		};
		fetchDependencies();
	}, []);

	const onSubmit = async (data: ISessaoForm) => {
		try {
			await api.post('/sessoes', data);
			alert('Sessão cadastrada com sucesso!');
			loadLista();
			reset();
		} catch (error) {
			console.error('Erro ao cadastrar sessão:', error);
			alert('Erro ao cadastrar sessão. Verifique o console.');
		}
	};

	return (
		<>
			<h2 className="mb-4">Cadastro de Sessões</h2>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Row className="mb-3">
					<Form.Group as={Col} md="4" controlId="filmeId">
						<Form.Label>Filme</Form.Label>
						<Form.Select isInvalid={!!errors.filmeId} {...register('filmeId')}>
							<option value="">Selecione o Filme...</option>
							{filmes.map((filme) => (
								<option key={filme.id} value={filme.id}>
									{filme.titulo}
								</option>
							))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							{errors.filmeId && errors.filmeId.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="4" controlId="salaId">
						<Form.Label>Sala</Form.Label>
						<Form.Select isInvalid={!!errors.salaId} {...register('salaId')}>
							<option value="">Selecione a Sala...</option>
							{salas.map((sala) => (
								<option key={sala.id} value={sala.id}>
									Sala {sala.numero}
								</option>
							))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							{errors.salaId && errors.salaId.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="4" controlId="horarioExibicao">
						<Form.Label>Data e Horário</Form.Label>
						<Form.Control
							type="datetime-local"
							isInvalid={!!errors.horarioExibicao}
							{...register('horarioExibicao')}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.horarioExibicao && errors.horarioExibicao.message}
						</Form.Control.Feedback>
					</Form.Group>
				</Row>

				<Row>
					<Col className="text-end">
						<Button variant="success" type="submit">
							Salvar
						</Button>
					</Col>
				</Row>
				<hr />
			</Form>
		</>
	);
}
