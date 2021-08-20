export interface Aparelho{
    id: string;
    nome: string;
    idUsuario: string;
    capacidadeLitros: number;
    leitura: number;
    quantidadeProduto: number; // qual unidade de medida?
    tipoProduto: string; // em pó, pedra ou líquido
    ip: string;
    nomeRede: string;
    senhaRede: string;
}