import { historicoDataSource } from '../../datasource/exportDatasource';
import { Historico } from '../../interfaces/exportInterfaces';
import { aparelhoBusiness } from '../exportBusiness';

// const axios = require('axios')

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
            // const retornoLeituraArduino = (await axios.post('http://192.168.0.20')).data;

            const historico = {} as Historico;
            historico.ativo = true;
            historico.idAparelho = idAparelho;
            // historico.leitura = retornoLeituraArduino.leitura_ph;
            historico.leitura = 5;

            //CALCULAR PRODUTO
            if (historico.leitura >= 7.4 && historico.leitura <= 8) {
                // redutor 13ml/m3
                // 1000 L = 1m3
                let capacidadeMetrosCubicos = capacidadeLitros / 1000;
                historico.quantidadeProduto = 13 * capacidadeMetrosCubicos;
            }

            if (historico.leitura > 8) {
                //redutor 25ml/m3
                let capacidadeMetrosCubicos = capacidadeLitros / 1000;
                historico.quantidadeProduto = 25 * capacidadeMetrosCubicos;
            }

            if (historico.leitura >= 6.8 && historico.leitura <= 7) {
                //elevador 15ml/m3            
                let capacidadeMetrosCubicos = capacidadeLitros / 1000;
                historico.quantidadeProduto = 15 * capacidadeMetrosCubicos;
            }

            if (historico.leitura < 6.8) {
                //elevador 20ml/m3
                let capacidadeMetrosCubicos = capacidadeLitros / 1000;
                historico.quantidadeProduto = 20 * capacidadeMetrosCubicos;
            }

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