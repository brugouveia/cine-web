import {z} from 'zod';
import {type IFilme} from './Filme';
import {type ISala} from './Sala';

export interface ISessao {
	id: number;
	horarioExibicao: string;
	filmeId: number;
	salaId: number;
	filme?: IFilme;
	sala?: ISala;
}

const dateFutureCheck = z.string().refine((val) => {
	const now = new Date();
	const oneMinuteAgo = new Date(now.getTime() - 60000);
	const sessionDate = new Date(val);
	return sessionDate > oneMinuteAgo;
}, 'A data e hora da sessão não pode ser retroativa (deve ser futura).');

export const SessaoSchema = z.object({
	id: z.int().optional(),
	filmeId: z.string().min(1, 'O Filme é obrigatório.'),
	salaId: z.string().min(1, 'A Sala é obrigatória.'),
	horarioExibicao: z.string().min(1, 'A Data e Hora da Sessão são obrigatórias.').pipe(dateFutureCheck),
});

export type ISessaoForm = z.infer<typeof SessaoSchema>;
