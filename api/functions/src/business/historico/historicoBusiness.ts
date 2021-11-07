import { historicoDataSource } from '../../datasource/exportDatasource';
import { Historico } from '../../entities/exportEntities';
import { aparelhoBusiness } from '../exportBusiness';

const axios = require('axios')

class HistoricoBusiness {

    consultarTodosHistoricos = () => {
        return historicoDataSource.consultarTodosHistoricos();
    }

    consultarHistoricosPorAparelho = (idAparelho: string) => {
        return historicoDataSource.consultarHistoricosPorAparelho(idAparelho);
    }

    salvarHistorico = async (idAparelho: string) => {

        try {
            //CONSULTAR CAPACIDADE
            const capacidadeLitros = (await aparelhoBusiness.consultarAparelhoPorId(idAparelho)).response.capacidadeLitros;

            //MEDIR PH 
            const retornoArduino = (await axios.post('http://192.168.0.22?capacidade=' + capacidadeLitros)).data;

            const historico = {} as Historico;
            historico.ativo = true;
            historico.dataMedicao = new Date();
            historico.idAparelho = idAparelho;
            historico.leitura = retornoArduino.leitura_ph;
            historico.quantidadeProduto = retornoArduino.quantidade_produto;
            historico.tipoProduto = retornoArduino.tipo_produto;

            //SALVAR HISTORICO
            return historicoDataSource.salvarHistorico(historico);

        } catch (error) {
            return error;
        }

    }

    desativarHistoricoPorAparelho = (idAparelho: string) => {
        return historicoDataSource.desativarHistoricoPorAparelho(idAparelho);
    }
}

export const historicoBusiness = new HistoricoBusiness();