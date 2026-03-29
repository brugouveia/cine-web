export class CreateFilmeDto {
    titulo: string;
    sinopse: string;
    classificacao: string;
    duracao: number;
    elenco?: string;
    genero: string;
    dataInicioExibicao: string;
    dataFinalExibicao: string;
}
