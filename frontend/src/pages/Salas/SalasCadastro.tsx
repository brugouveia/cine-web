import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type ISalaForm, SalaSchema, TipoSala} from '../../models/Sala';
import {api} from '../../api';
import {Button, Col, Form, Row} from 'react-bootstrap';

export function SalasCadastro({loadLista}: {loadLista: () => void}) {
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<ISalaForm>({
		resolver: zodResolver(SalaSchema.omit({id: true})),
	});

	const onSubmit = async (data: ISalaForm) => {
		try {
			await api.post('/salas', data);
			alert('Sala cadastrada com sucesso!');
			loadLista();
			reset();
		} catch (error) {
			console.error('Erro ao cadastrar sala:', error);
			alert('Erro ao cadastrar sala. Verifique o console.');
		}
	};

	return (
		<>
			<h2 className="mb-4">Cadastro de Salas</h2>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Row className="mb-3">
					<Form.Group as={Col} md="4" controlId="numero">
						<Form.Label>Número da Sala</Form.Label>
						<Form.Control
							type="number"
							isInvalid={!!errors.numero}
							{...register('numero', {valueAsNumber: true})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.numero && errors.numero.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="4" controlId="capacidade">
						<Form.Label>Capacidade</Form.Label>
						<Form.Control
							type="number"
							isInvalid={!!errors.capacidade}
							{...register('capacidade', {valueAsNumber: true})}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.capacidade && errors.capacidade.message}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} md="4" controlId="tipo">
						<Form.Label>Gênero</Form.Label>
						<Form.Select isInvalid={!!errors.tipo} {...register('tipo')}>
							<option value="">Selecione...</option>
							{Object.values(TipoSala).map((tipo) => (
								<option key={tipo} value={tipo}>
									{tipo}
								</option>
							))}
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							{errors.tipo && errors.tipo.message}
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
