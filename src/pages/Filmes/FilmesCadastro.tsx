import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FilmeSchema, GeneroFilme, type IFilmeForm} from '../../models/Filme';
import {api} from '../../api';
import {Button, Col, Form, Row} from 'react-bootstrap';

export function FilmesCadastro({loadLista}: {loadLista: () => void}) {
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<IFilmeForm>({
		resolver: zodResolver(FilmeSchema.omit({id: true})),
	});

	const onSubmit = async (data: IFilmeForm) => {
		try {
			await api.post('/filmes', data);
			alert('Filme cadastrado com sucesso!');
			loadLista();
			reset();
		} catch (error) {
			console.error('Erro ao cadastrar filme:', error);
			alert('Erro ao cadastrar filme. Verifique o console.');
		}
	};

	return (
		<>
			<h2 className="mb-4">Cadastro de Filmes</h2>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Row className="mb-3">
					<Form.Group as={Col} md="6" controlId="titulo">
						<Form.Label>Título</Form.Label>
						<Form.Control type="text" isInvalid={!!errors.titulo} {...register('titulo')} />
						<Form.Control.Feedback type="invalid">
							{errors.titulo && errors.titulo.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="6" controlId="duracao">
						<Form.Label>Duração (minutos)</Form.Label>
						<Form.Control
							type="number"
							isInvalid={!!errors.duracao}
							{...register('duracao', {valueAsNumber: true})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.duracao && errors.duracao.message}
						</Form.Control.Feedback>
					</Form.Group>
				</Row>

				<Form.Group className="mb-3" controlId="sinopse">
					<Form.Label>Sinopse</Form.Label>
					<Form.Control as="textarea" rows={3} isInvalid={!!errors.sinopse} {...register('sinopse')} />
					<Form.Control.Feedback type="invalid">
						{errors.sinopse && errors.sinopse.message}
					</Form.Control.Feedback>
				</Form.Group>

				<Row className="mb-3">
					<Form.Group as={Col} md="4" controlId="genero">
						<Form.Label>Gênero</Form.Label>
						<Form.Select isInvalid={!!errors.genero} {...register('genero')}>
							<option value="">Selecione...</option>
							{Object.values(GeneroFilme).map((genero) => (
								<option key={genero} value={genero}>
									{genero}
								</option>
							))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							{errors.genero && errors.genero.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="4" controlId="classificacao">
						<Form.Label>Classificação</Form.Label>
						<Form.Control type="text" isInvalid={!!errors.classificacao} {...register('classificacao')} />
						<Form.Control.Feedback type="invalid">
							{errors.classificacao && errors.classificacao.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="4" controlId="elenco">
						<Form.Label>Elenco</Form.Label>
						<Form.Control type="text" isInvalid={!!errors.elenco} {...register('elenco')} />
						<Form.Control.Feedback type="invalid">
							{errors.elenco && errors.elenco.message}
						</Form.Control.Feedback>
					</Form.Group>
				</Row>

				<Row className="mb-4">
					<Form.Group as={Col} md="6" controlId="dataInicioExibicao">
						<Form.Label>Data Início Exibição</Form.Label>
						<Form.Control
							type="date"
							isInvalid={!!errors.dataInicioExibicao}
							{...register('dataInicioExibicao')}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.dataInicioExibicao && errors.dataInicioExibicao.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="6" controlId="dataFinalExibicao">
						<Form.Label>Data Final Exibição</Form.Label>
						<Form.Control
							type="date"
							isInvalid={!!errors.dataFinalExibicao}
							{...register('dataFinalExibicao')}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.dataFinalExibicao && errors.dataFinalExibicao.message}
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
