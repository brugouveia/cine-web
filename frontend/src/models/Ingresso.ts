import {z} from 'zod';
import {type ISessao} from './Sessao';

export interface IIngresso {
	id: number;
	sessaoId: string;
	valorInteira: number;
	valorMeia: number;
	sessao?: ISessao;
}

export enum TipoIngresso {
	INTEIRA = 'Inteira',
	MEIA = 'Meia',
}

export const IngressoVendaSchema = z.object({
	sessaoId: z.string(),
	tipo: z.enum(TipoIngresso, {message: 'Selecione o Tipo de Ingresso.'}),
	valorUnitario: z.number().positive('O valor deve ser positivo.'),
});

export type IIngressoVendaForm = z.infer<typeof IngressoVendaSchema>;
