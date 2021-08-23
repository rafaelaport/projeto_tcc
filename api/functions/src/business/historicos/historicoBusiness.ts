import { historicoDataSource } from '../../datasource/exportDatasource'

class HistoricoBusiness {

    consultarTodosHistoricos = () => {
        return historicoDataSource.consultarTodosHistoricos();
    }

    consultarHistoricosPorAparelho = (idAparelho: string) => {
        return historicoDataSource.consultarHistoricosPorAparelho(idAparelho);
    }
}

export const historicoBusiness = new HistoricoBusiness();