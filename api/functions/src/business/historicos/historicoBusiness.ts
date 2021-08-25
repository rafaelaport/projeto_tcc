import { historicoDataSource, aparelhoDataSource } from '../../datasource/exportDatasource';
import { Aparelho } from '../../interfaces/exportInterfaces';

const axios = require('axios')

class HistoricoBusiness {

    consultarTodosHistoricos = () => {
        return historicoDataSource.consultarTodosHistoricos();
    }

    consultarHistoricosPorAparelho = (idAparelho: string) => {
        return historicoDataSource.consultarHistoricosPorAparelho(idAparelho);
    }

    salvarHistorico = async (idAparelho: string) => {

        //CONSULTAR APARELHO
        const aparelho: Aparelho = (await aparelhoDataSource.consultarAparelhoPorId(idAparelho)).response;
        const ip = aparelho.ip.replace(/\,/g,'.');
        
        const historico: any = null;

        //MEDIR PH -- PASSAR INFORMAÇÕES DO APARELHO PARA ARDUINO
        axios.get(`http://${ip}`).then(function (resposta: any) {

            historico.leitura = resposta.data.leitura_ph;
            console.log(resposta.data.leitura_ph);

        }).catch(function (error: any) {
            console.log(error);
        });


        //CALCULAR PRODUTO


        

        //SALVAR HISTORICO
        //return historicoDataSource.salvarHistorico(historico);
    }
}

export const historicoBusiness = new HistoricoBusiness();