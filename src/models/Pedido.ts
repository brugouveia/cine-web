import type {Ingresso} from './Ingresso';
import type {LancheCombo} from './LancheCombo';

export interface Pedido {
	id: number;
	qtdInteira: number;
	qtdMeia: number;
	ingresso: Ingresso[];
	lanche: LancheCombo[];
	valorTotal: number;
}
