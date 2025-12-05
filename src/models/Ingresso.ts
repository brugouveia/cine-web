import type {Sessao} from './Sessao';

export interface Ingresso {
	id: number;
	valorInteira: number;
	valorMeia: number;
	sessao: Sessao;
}
