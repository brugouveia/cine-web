import type {Filme} from './Filme.ts';
import type {Sala} from './Sala.ts';

export interface Sessao {
	id: number;
	horarioExibicao: Date | string;
	filme: Filme;
	sala: Sala;
}
