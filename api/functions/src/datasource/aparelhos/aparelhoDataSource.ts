import { Aparelho, MessageTreatment } from '../../interfaces/exportInterfaces';
import { messageTreatmentBusiness } from '../../business/exportBusiness';

import * as admin from 'firebase-admin';

const firestore = admin.firestore();

class AparelhoDataSource {

    private collection = firestore.collection('aparelho');

    consultarTodosAparelhos = async (): Promise<MessageTreatment> => {

        return await this.collection.get().then(async (result) => {

            const aparelhos: Array<Aparelho> = new Array<Aparelho>();

            result.docs.map(doc => {
                const aparelho = doc.data() as Aparelho;
                aparelho.id = doc.id;

                aparelhos.push(aparelho);
            })

            return messageTreatmentBusiness.sucessMsg('Aparelhos encontrados.', aparelhos);
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

                    const aparelhos: Array<Aparelho> = new Array<Aparelho>();

                    result.docs.map(doc => {
                        const aparelho = doc.data() as Aparelho;
                        aparelho.id = doc.id;

                        aparelhos.push(aparelho);
                    })

                    return messageTreatmentBusiness.sucessMsg('Aparelho encontrado.', aparelhos);
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

                    const aparelho = result.data() as Aparelho;
                    aparelho.id = result.id;

                    return messageTreatmentBusiness.sucessMsg('Aparelho encontrado.', aparelho);
                }
            })
            .catch((error) => {
                return messageTreatmentBusiness.errorMsg('Falha ao buscar aparelho, tente novamente.', error);
            });
    }

    criarAparelho = async (aparelho: Aparelho): Promise<MessageTreatment> => {
        let documentoInserido = await this.collection.doc().set(aparelho);

        return messageTreatmentBusiness.sucessMsg(`Aparelho ${aparelho.nome} adicionado.`, documentoInserido);
    }

    alterarAparelho = async (id: string, aparelho: Aparelho): Promise<MessageTreatment> => {
        let documentoInserido = await this.collection.doc(id).set(aparelho);

        return messageTreatmentBusiness.sucessMsg(`Aparelho ${aparelho.nome} alterado.`, documentoInserido);
    }

    excluirAparelho = async (id: string): Promise<MessageTreatment> => {
        
        return await this.collection.doc(id).delete()
            .then(function () {
                return messageTreatmentBusiness.sucessMsg(`Aparelho com o id ${id} removido.`);
            })
            .catch(function (error) {
                return messageTreatmentBusiness.errorMsg('Falha ao remover aparelho, tente novamente.', error);
            })
    }
}

export const aparelhoDataSource = new AparelhoDataSource();