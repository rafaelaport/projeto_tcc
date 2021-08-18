import { MessageTreatment } from '../../interfaces/exportInterfaces';
import { messageTreatmentBusiness } from '../../business/exportBusiness';

import * as admin from 'firebase-admin';

const firestore = admin.firestore();

class DataSourceAparelho {

    getAparelhos = async () => {
        //let aparelho: Aparelho = { id: '1', nome: 'rafaela', capacidadeLitros: 6000, idUsuario: '1' };
        let collection = firestore.collection('aparelho');

        return null; /*await collection
            .get()
            .then( async (result) => {
                return await messageTreatmentBusiness.sucessMsg("", result.docs.forEach(doc)data());
            })*/
    }

}

export const dataSourceAparelho = new DataSourceAparelho();