import { historicoDataSource } from '../../datasource/exportDatasource'
import { Historico } from '../../interfaces/exportInterfaces';

class HistoricoBusiness {

    consultarTodosHistoricos = () => {
        return historicoDataSource.consultarTodosHistoricos();
    }

    consultarHistoricosPorAparelho = (idAparelho: string) => {
        return historicoDataSource.consultarHistoricosPorAparelho(idAparelho);
    }

    salvarHistorico = (idAparelho: string) => {

        //CONSULTAR APARELHO
        const aparelho = this.consultarHistoricosPorAparelho(idAparelho);
        

        //MEDIR PH
        //CALCULAR PRODUTO
        

        const historico;

        //SALVAR HISTORICO
        return historicoDataSource.salvarHistorico(historico);
    }
}

export const historicoBusiness = new HistoricoBusiness();