import { Historico, MessageTreatment } from '../../interfaces/exportInterfaces';
import { messageTreatmentBusiness } from '../../business/exportBusiness';

import * as admin from 'firebase-admin';

const firestore = admin.firestore();

class HistoricoDataSource {

    private collection = firestore.collection('historico');

    consultarTodosHistoricos = async (): Promise<MessageTreatment> => {

        return await this.collection.get().then(async (result) => {

            const historicos: Array<Historico> = new Array<Historico>();

            result.docs.map(doc => {
                const historico = doc.data() as Historico;
                historico.id = doc.id;

                historicos.push(historico);
            })

            return messageTreatmentBusiness.sucessMsg('Históricos encontrados.', historicos);
        })
            .catch((error) => {
                return messageTreatmentBusiness.errorMsg('Falha ao buscar históricos, tente novamente.', error);
            });
    }

    consultarHistoricosPorAparelho =  async (idAparelho: string): Promise<MessageTreatment> => {

        return await this.collection.where('idAparelho', '==', idAparelho).get()
            .then(async (result) => {

                if (result.empty) {

                    return messageTreatmentBusiness.sucessMsg('Histórico não encontrado.');
                }
                else {

                    const historicos: Array<Historico> = new Array<Historico>();

                    result.docs.map(doc => {
                        const historico = doc.data() as Historico;
                        historico.id = doc.id;

                        historicos.push(historico);
                    })

                    return messageTreatmentBusiness.sucessMsg('Histórico encontrado.', historicos);
                }
            })
            .catch((error) => {
                return messageTreatmentBusiness.errorMsg('Falha ao buscar histórico, tente novamente.', error);
            });
    }
}

export const historicoDataSource = new HistoricoDataSource();