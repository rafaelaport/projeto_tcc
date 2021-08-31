import { Historico, MessageTreatment } from '../../interfaces/exportInterfaces';
import { messageTreatmentBusiness } from '../../business/exportBusiness';

import * as admin from 'firebase-admin';

const firestore = admin.firestore();

class HistoricoDataSource {

    private collection = firestore.collection('historico');

    consultarTodosHistoricos = async (): Promise<MessageTreatment> => {

        try {
            const result = await this.collection.get();

            const historicos: Array<Historico> = new Array<Historico>();

            result.docs.map(doc => {
                const historico = doc.data() as Historico;
                historico.id = doc.id;

                historicos.push(historico);
            })

            return messageTreatmentBusiness.sucessMsg('Históricos encontrados.', historicos);

        } catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao buscar históricos, entre em contato com o administrador.', error);
        }
    }

    consultarHistoricosPorAparelho = async (idAparelho: string): Promise<MessageTreatment> => {

        try {
            const result = await this.collection.where('idAparelho', '==', idAparelho).get();

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

        } catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao buscar histórico, entre em contato com o administrador.', error);
        }
    }

    salvarHistorico = async (historico: Historico): Promise<MessageTreatment> => {

        try {
            let documentoInserido = await this.collection.doc().set(historico);

            return messageTreatmentBusiness.sucessMsg(`Histórico adicionado.`, documentoInserido);

        } catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao adicionar histórico, entre em contato com o administrador.', error);
        }

    }
}

export const historicoDataSource = new HistoricoDataSource();