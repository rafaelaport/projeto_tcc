import { Aparelho, MessageTreatment } from '../../interfaces/exportInterfaces';
import { messageTreatmentBusiness } from '../../business/exportBusiness';

import * as admin from 'firebase-admin';

const firestore = admin.firestore();

class AparelhoDataSource {

    private collection = firestore.collection('aparelho');

    consultarTodosAparelhos = async (): Promise<MessageTreatment> => {

        return await this.collection.get().then(async (result) => {
            return messageTreatmentBusiness.sucessMsg('Aparelhos encontrados.', result.docs.map(doc => doc.data()));
        })
            .catch((error) => {
                return messageTreatmentBusiness.errorMsg('Falha ao buscar aparelhos, tente novamente.', error);
            });
    }

    consultarAparelhosPorUsuario = async (idUsuario: string): Promise<MessageTreatment> => {

        return await this.collection.where('idUsuario', '==', idUsuario).get()
            .then(async (result) => {
                if (result.empty) {
                    return messageTreatmentBusiness.sucessMsg('Aparelho não encontrado.');
                }
                else {
                    return messageTreatmentBusiness.sucessMsg('Aparelho encontrado.', result.docs.map(doc => doc.data()));
                }
            })
            .catch((error) => {
                return messageTreatmentBusiness.errorMsg('Falha ao buscar aparelho, tente novamente.', error);
            });
    }

    consultarAparelhoPorId = async (id: string): Promise<MessageTreatment> => {

        return await this.collection.doc(id).get()
            .then(async (result) => {
                if (!result.exists) {
                    return messageTreatmentBusiness.sucessMsg('Aparelho não encontrado.');
                }
                else {
                    return messageTreatmentBusiness.sucessMsg('Aparelho encontrado.', result.data());
                }
            })
            .catch((error) => {
                return messageTreatmentBusiness.errorMsg('Falha ao buscar aparelho, tente novamente.', error);
            });
    }

    criarAparelho = async (aparelho: Aparelho): Promise<MessageTreatment> => {
        let documentoInserido = await firestore.collection('aparelho').doc().set(aparelho);
        
        return messageTreatmentBusiness.sucessMsg(`Aparelho ${aparelho.nome} adicionado.`, documentoInserido);
    }

    alterarAparelho = async (id: string, aparelho: Aparelho): Promise<MessageTreatment> => {
        let documentoInserido = await firestore.collection('aparelho').doc(id).set(aparelho);
        
        return messageTreatmentBusiness.sucessMsg(`Aparelho ${aparelho.nome} alterado.`, documentoInserido);
    }
}

export const aparelhoDataSource = new AparelhoDataSource();