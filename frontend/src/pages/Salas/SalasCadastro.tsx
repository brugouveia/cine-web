import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type ISala, type ISalaForm, SalaSchema, TipoSala} from '../../models/Sala';
import {api} from '../../api';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {useEffect} from 'react';

interface SalasCadastroProps {
	loadLista: () => void;
	salaEditando?: ISala | null;
	onCancelEdit?: () => void;
}

const defaultValues: Partial<ISalaForm> = {
	numero: 0,
	capacidade: 0,
	tipo: undefined,
};

export function SalasCadastro({loadLista, salaEditando, onCancelEdit}: SalasCadastroProps) {
	const isEditando = !!salaEditando;

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm<ISalaForm>({
		resolver: zodResolver(SalaSchema.omit({id: true})),
		defaultValues,
	});

	useEffect(() => {
		if (salaEditando) {
			reset(salaEditando);
		}
	}, [salaEditando, reset]);

	const clearForm = () => {
		reset(defaultValues);
	};

	const onSubmit = async (data: ISalaForm) => {
		try {
			if (isEditando) {
				await api.patch(`/salas/${salaEditando!.id}`, data);
				alert('Sala atualizada com sucesso!');
				onCancelEdit?.();
			} else {
				await api.post('/salas', data);
				alert('Sala cadastrada com sucesso!');
			}
			loadLista();
			clearForm();
		} catch (error) {
			console.error(isEditando ? 'Erro ao atualizar sala:' : 'Erro ao cadastrar sala:', error);
			alert(isEditando ? 'Erro ao atualizar sala.' : 'Erro ao cadastrar sala.');
		}
	};

	return (
		<>
			<h2 className="mb-4">{isEditando ? 'Editar Sala' : 'Cadastro de Salas'}</h2>
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
