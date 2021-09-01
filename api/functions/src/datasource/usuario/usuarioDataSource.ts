import { MessageTreatment, Usuario } from "../../interfaces/exportInterfaces";
import { messageTreatmentBusiness } from "../../business/exportBusiness";

import * as admin from 'firebase-admin';

const firestore = admin.firestore();

class UsuarioDataSource{

    private collection = firestore.collection('usuario');

    consultarUsuarioPorId = async (id: string): Promise<MessageTreatment> => {

        try {
            const response = await this.collection.doc(id).get();

            if (!response.exists) {

                return messageTreatmentBusiness.sucessMsg("Usuário não encontrado.");

            } else {

                const usuario = response.data() as Usuario;
                usuario.id = response.id;

                return messageTreatmentBusiness.sucessMsg("Usuário encontrado.", usuario);
            }
        } catch (error) {
            return messageTreatmentBusiness.errorMsg("Falha ao buscar usuário, entre em contato com o administrador.");
        }
    }

    ConsultarUsuarioPorCpfCnpj = async (cpf_cnpj: string): Promise<MessageTreatment> => {

        try {
            const result = await this.collection.where('cpf_cnpj', '==', cpf_cnpj).get();

            if (result.empty) {

                return messageTreatmentBusiness.sucessMsg('Usuário não encontrado.');
            }
            else {

                let usuario = { } as Usuario;

                result.docs.map(doc => {
                    usuario = doc.data() as Usuario;
                    usuario.id = doc.id;
                })

                return messageTreatmentBusiness.sucessMsg('Usuário encontrado.', usuario);
            }
        }
        catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao buscar usuário, entre em contato com o administrador.', error);
        }
    }

    salvarUsuario = async (usuario: Usuario): Promise<MessageTreatment> => {
        try {
            let documentoInserido = await this.collection.doc().set(usuario);

            return messageTreatmentBusiness.sucessMsg(`Usuário ${usuario.nome} adicionado.`, documentoInserido);

        } catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao adicionar usuário, entre em contato com o administrador.', error);
        }

    }

    editarUsuario = async (id: string, usuario: Usuario): Promise<MessageTreatment> => {

        try {
            let documentoInserido = await this.collection.doc(id).set(usuario);

            return messageTreatmentBusiness.sucessMsg(`Usuário ${usuario.nome} alterado.`, documentoInserido);

        } catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao alterar usuário, entre em contato com o administrador.', error);
        }

    }

    excluirUsuario = async (id: string): Promise<MessageTreatment> => {

        try {
            await this.collection.doc(id).delete();
            return messageTreatmentBusiness.sucessMsg(`Usuário com o id ${id} removido.`);

        } catch (error) {
            return messageTreatmentBusiness.errorMsg('Falha ao remover usuário, entre em contato com o administrador.', error);
        }
    }

}

export const usuarioDataSource = new UsuarioDataSource();