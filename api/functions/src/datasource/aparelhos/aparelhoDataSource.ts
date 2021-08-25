import { Aparelho, MessageTreatment } from '../../interfaces/exportInterfaces';
import { messageTreatmentBusiness } from '../../business/exportBusiness';

import * as admin from 'firebase-admin';

const firestore = admin.firestore();

class AparelhoDataSource {

    private collection = firestore.collection('aparelho');

    consultarTodosAparelhos = async (): Promise<MessageTreatment> => {

        try {
            const result = await this.collection.get();

            const aparelhos: Array<Aparelho> = new Array<Aparelho>();

            result.docs.map(doc => {
                const aparelho = doc.data() as Aparelho;
                aparelho.id = doc.id;

                aparelhos.push(aparelho);
            })

            return messageTreatmentBusiness.sucessMsg('Aparelhos encontrados.', aparelhos);
        }
        catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao buscar aparelhos, entre em contato com o administrador.', error);
        }
    }

    consultarAparelhosPorUsuario = async (idUsuario: string): Promise<MessageTreatment> => {

        try {
            const result = await this.collection.where('idUsuario', '==', idUsuario).get();

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
        }
        catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao buscar aparelho, entre em contato com o administrador.', error);
        }
    }

    consultarAparelhoPorId = async (id: string): Promise<MessageTreatment> => {

        try {
            const response = await this.collection.doc(id).get();

            if (!response.exists) {

                return messageTreatmentBusiness.sucessMsg("Aparelho não encontrado.");

            } else {

                const aparelho = response.data() as Aparelho;
                aparelho.id = response.id;

                return messageTreatmentBusiness.sucessMsg("Aparelho encontrado.", aparelho);
            }
        } catch (error) {
            return messageTreatmentBusiness.errorMsg("Falha ao buscar aparelho, entre em contato com o administrador.");
        }
    }

    salvarAparelho = async (aparelho: Aparelho): Promise<MessageTreatment> => {
        try {
            let documentoInserido = await this.collection.doc().set(aparelho);

            return messageTreatmentBusiness.sucessMsg(`Aparelho ${aparelho.nome} adicionado.`, documentoInserido);

        } catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao adicionar aparelho, entre em contato com o administrador.', error);
        }

    }

    editarAparelho = async (id: string, aparelho: Aparelho): Promise<MessageTreatment> => {

        try {
            let documentoInserido = await this.collection.doc(id).set(aparelho);

            return messageTreatmentBusiness.sucessMsg(`Aparelho ${aparelho.nome} alterado.`, documentoInserido);

        } catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao alterar aparelho, entre em contato com o administrador.', error);
        }

    }

    excluirAparelho = async (id: string): Promise<MessageTreatment> => {

        try {
            await this.collection.doc(id).delete();
            return messageTreatmentBusiness.sucessMsg(`Aparelho com o id ${id} removido.`);

        } catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao remover aparelho, entre em contato com o administrador.', error);
        }
    }
}

export const aparelhoDataSource = new AparelhoDataSource();