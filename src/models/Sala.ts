import {z} from 'zod';

export enum TipoSala {
	'2D' = '2D',
	'3D' = '3D',
	IMAX = 'IMAX',
}

export interface ISala {
	id: number;
	numero: number;
	capacidade: number;
	tipo: TipoSala;
}

export const SalaSchema = z.object({
	id: z.number().optional(),
	numero: z.int('O Número da Sala deve ser inteiro.').positive('O Número da Sala deve ser positivo.'),
	capacidade: z
		.int('A Capacidade deve ser um número inteiro.')
		.positive('A Capacidade deve ser positiva e maior que 0.'),
	tipo: z.enum(TipoSala, {message: 'Selecione o Tipo'}),
});

export type ISalaForm = z.infer<typeof SalaSchema>;
