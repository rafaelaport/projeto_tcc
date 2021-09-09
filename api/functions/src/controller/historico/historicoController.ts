import { historicoBusiness } from '../../business/exportBusiness';

class HistoricoController {

    consultarTodosHistoricos = () => {
        return historicoBusiness.consultarTodosHistoricos();
    }

    consultarHistoricosPorAparelho = (idAparelho: string) => {
        return historicoBusiness.consultarHistoricosPorAparelho(idAparelho);
    }

    salvarHistorico = (idAparelho: string) => {
        return historicoBusiness.salvarHistorico(idAparelho);
    }

    desativarHistoricoPorAparelho = (idAparelho: string) => {
        return historicoBusiness.desativarHistoricoPorAparelho(idAparelho);
    }
}

export const historicoController = new HistoricoController();