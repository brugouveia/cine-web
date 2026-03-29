import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type ISessao, type ISessaoForm, SessaoSchema} from '../../models/Sessao';
import {type IFilme} from '../../models/Filme';
import {type ISala} from '../../models/Sala';
import {api} from '../../api';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {useEffect, useState} from 'react';

interface SessoesCadastroProps {
	loadLista: () => void;
	sessaoEditando?: ISessao | null;
	onCancelEdit?: () => void;
}

const defaultValues: Partial<ISessaoForm> = {filmeId: '', salaId: '', horarioExibicao: ''};

export function SessoesCadastro({loadLista, sessaoEditando, onCancelEdit}: SessoesCadastroProps) {
	const [filmes, setFilmes] = useState<IFilme[]>([]);
	const [salas, setSalas] = useState<ISala[]>([]);
	const isEditando = !!sessaoEditando;

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<ISessaoForm>({
		resolver: zodResolver(SessaoSchema.omit({id: true})),
		defaultValues,
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
		void fetchDependencies();
	}, []);

	function formatToDatetimeLocal(dateString: string) {
		const date = new Date(dateString);

		const pad = (n: number) => String(n).padStart(2, '0');

		return (
			date.getFullYear() +
			'-' +
			pad(date.getMonth() + 1) +
			'-' +
			pad(date.getDate()) +
			'T' +
			pad(date.getHours()) +
			':' +
			pad(date.getMinutes())
		);
	}

	useEffect(() => {
		if (sessaoEditando) {
			reset({
				filmeId: String(sessaoEditando.filmeId),
				salaId: String(sessaoEditando.salaId),
				horarioExibicao: formatToDatetimeLocal(sessaoEditando.horarioExibicao),
			});
		}
	}, [sessaoEditando, reset]);

	const clearForm = () => {
		reset(defaultValues);
	};

	const onSubmit = async (data: ISessaoForm) => {
		try {
			if (isEditando) {
				await api.patch(`/sessoes/${sessaoEditando!.id}`, data);
				alert('Sessão atualizada com sucesso!');
				onCancelEdit?.();
			} else {
				await api.post('/sessoes', data);
				alert('Sessão cadastrada com sucesso!');
			}
			loadLista();
			clearForm();
		} catch (error) {
			console.error(isEditando ? 'Erro ao atualizar sessão:' : 'Erro ao cadastrar sessão:', error);
			alert(isEditando ? 'Erro ao atualizar sessão.' : 'Erro ao cadastrar sessão.');
		}
	};

	return (
		<>
			<h2 className="mb-4">{isEditando ? 'Editar Sessão' : 'Cadastro de Sessões'}</h2>
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
						{isEditando && (
							<Button
								variant="secondary"
								className="me-2"
								onClick={() => {
									clearForm();
									onCancelEdit?.();
								}}
							>
								Cancelar
							</Button>
						)}
						<Button variant="success" type="submit">
							{isEditando ? 'Atualizar' : 'Salvar'}
						</Button>
					</Col>
				</Row>
				<hr />
			</Form>
		</>
	);
}
