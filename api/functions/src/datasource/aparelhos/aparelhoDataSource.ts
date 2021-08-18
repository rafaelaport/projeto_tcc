import { MessageTreatment } from '../../interfaces/exportInterfaces';
import { messageTreatmentBusiness } from '../../business/exportBusiness';

import * as admin from 'firebase-admin';

const firestore = admin.firestore();

class AparelhoDataSource {

    private collection = firestore.collection('aparelho');

    //TRATAR CONSULTAS QUE NÃO RETORNAM VALOR  https://firebase.google.com/docs/firestore/query-data/get-data
    consultarTodosAparelhos = async (): Promise<MessageTreatment> => {
        
        return await this.collection.get().then( async (result) => {
            return messageTreatmentBusiness.sucessMsg('Aparelhos encontrados.', result.docs.map(doc => doc.data()));
        })
        .catch((error) => {
            return messageTreatmentBusiness.errorMsg('Falha ao buscar aparelhos, tente novamente.', error);
        });
    }

    consultarAparelhoPorUsuario = async (idUsuario: string): Promise<MessageTreatment> => {

        return await this.collection.doc(idUsuario).get()
            .then(async (result) => {
                return messageTreatmentBusiness.sucessMsg('Aparelho encontrado.', result.data());
            })
            .catch((error) => {
                return messageTreatmentBusiness.errorMsg('Falha ao buscar aparelho, tente novamente.', error);
            });
    }

    //AJUSTAR
    consultarAparelhoPorId = async (id: string): Promise<MessageTreatment> => {

        return await this.collection.where("idUsuario", "==", id).get()
            .then(async (result) => {
                return messageTreatmentBusiness.sucessMsg(`Aparelho encontrado. ${id}`, result);
            })
            .catch((error) => {
                return messageTreatmentBusiness.errorMsg('Falha ao buscar aparelho, tente novamente.', error);
            });
    }



}

export const aparelhoDataSource = new AparelhoDataSource();