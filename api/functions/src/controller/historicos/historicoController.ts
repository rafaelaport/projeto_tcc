import { historicoBusiness } from '../../business/exportBusiness';

class HistoricoController {

    consultarTodosHistoricos = () => {
        return historicoBusiness.consultarTodosHistoricos();
    }

    consultarHistoricosPorAparelho = (idAparelho: string) => {
        return historicoBusiness.consultarHistoricosPorAparelho(idAparelho);
    }
}

export const historicoController = new HistoricoController();