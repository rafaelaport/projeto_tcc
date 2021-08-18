import { MessageTreatment } from '../../interfaces/exportInterfaces';
import { messageTreatmentBusiness } from '../../business/exportBusiness';

import * as admin from 'firebase-admin';

const firestore = admin.firestore();

class AparelhoDataSource {

    consultarTodosAparelhos = async (): Promise<MessageTreatment> => {
        
        let collection = firestore.collection('aparelho');

        return await collection.get().then( async (result) => {
            return messageTreatmentBusiness.sucessMsg('Aparelhos encontrados.', result.docs.map(doc => doc.data()));
        })
        .catch((error) => {
            return messageTreatmentBusiness.errorMsg('Falha ao buscar aparelhos.', error);
        })
    }

}

export const aparelhoDataSource = new AparelhoDataSource();