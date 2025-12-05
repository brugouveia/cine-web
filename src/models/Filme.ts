import {z} from 'zod';

export enum GeneroFilme {
	ACAO = 'Ação',
	FANTASIA = 'Fantasia',
	FICCAO = 'Ficção',
	TERROR = 'Terror',
	COMEDIA = 'Comédia',
	DRAMA = 'Drama',
}

export interface IFilme {
	id: number;
	titulo: string;
	sinopse: string;
	classificacao: string;
	duracao: number;
	elenco: string;
	genero: GeneroFilme;
	dataInicioExibicao: string;
	dataFinalExibicao: string;
}

export const FilmeSchema = z.object({
	id: z.number().optional(),
	titulo: z.string().min(1, 'O Título é obrigatório.').max(100),
	sinopse: z.string().min(10, 'A Sinopse deve ter no mínimo 10 caracteres.'),
	classificacao: z.string().min(1, 'A Classificação é obrigatória.'),
	duracao: z.int('Duração deve ser um número inteiro.').positive('A Duração deve ser um número positivo.'),
	genero: z.enum(GeneroFilme),
	elenco: z.string().optional(),
	dataInicioExibicao: z.string().min(1, 'Data de Início da Exibição é obrigatória.'),
	dataFinalExibicao: z.string().min(1, 'Data Final da Exibição é obrigatória.'),
});

export type IFilmeForm = z.infer<typeof FilmeSchema>;
