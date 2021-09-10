import { usuarioDataSource } from "../../datasource/exportDatasource";
import { Aparelho, Usuario } from "../../interfaces/exportInterfaces";
import { aparelhoBusiness, messageTreatmentBusiness } from "../exportBusiness";

class UsuarioBusiness {

    consultarUsuarioPorId = (id: string) => {
        return usuarioDataSource.consultarUsuarioPorId(id);
    }

    ConsultarUsuarioPorCpfCnpj = (cpf_cnpj: string) => {
        return usuarioDataSource.ConsultarUsuarioPorCpfCnpj(cpf_cnpj);
    }

    salvarUsuario = (usuario: Usuario) => {
        usuario.ativo = true;
        return usuarioDataSource.salvarUsuario(usuario);
    }

    editarUsuario = (id: string, usuario: Usuario) => {
        usuario.ativo = true;
        return usuarioDataSource.editarUsuario(id, usuario);
    }

    desativarUsuario = async (id: string) => {

        const cpf_cnpj = (await this.consultarUsuarioPorId(id)).response.cpf_cnpj;
        const aparelhos = (await aparelhoBusiness.consultarAparelhosPorUsuario(cpf_cnpj)).response as Array<Aparelho>;

        if (aparelhos === undefined || aparelhos.length == 0) {

            return usuarioDataSource.desativarUsuario(id);
        }

        return messageTreatmentBusiness.infoMsg('Não é possível excluir o usuário pois existem aparelhos ativos.');
    }

}

export const usuarioBusiness = new UsuarioBusiness();