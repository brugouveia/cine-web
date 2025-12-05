import type {Sala} from './Sala';
import type {Filme} from './Filme';
import type {Sessao} from './Sessao';

export interface Cinema {
	id: number;
	nome: string;
	endereco: string;
	listaSalas: Sala[];
	listaFilmes: Filme[];
	listaSessao: Sessao[];
}
