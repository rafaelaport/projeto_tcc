import { historicoDataSource } from '../../datasource/exportDatasource'
import { Historico } from '../../interfaces/exportInterfaces';

const axios = require('axios')

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
        
        const historico: any = null;

        
        //MEDIR PH -- PASSAR INFORMAÇÕES DO APARELHO PARA ARDUINO
        axios.get('http://192.168.0.18').then(function (resposta: any) {

            historico.leitura = resposta.data.leitura_ph;
            console.log(resposta.data.leitura_ph);

        }).catch(function (error: any) {
            console.log(error);
        });


        //CALCULAR PRODUTO


        

        //SALVAR HISTORICO
        return historicoDataSource.salvarHistorico(historico);
    }
}

export const historicoBusiness = new HistoricoBusiness();