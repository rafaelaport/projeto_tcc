import { usuarioDataSource } from "../../datasource/exportDatasource";
import { Usuario } from "../../interfaces/exportInterfaces";

class UsuarioBusiness{
    
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

    desativarUsuario = (id: string) => {
        return usuarioDataSource.desativarUsuario(id);
    }

}

export const usuarioBusiness = new UsuarioBusiness();