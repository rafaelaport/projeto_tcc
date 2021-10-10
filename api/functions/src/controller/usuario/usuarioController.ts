import { usuarioBusiness } from "../../business/exportBusiness";
import { Usuario } from "../../entities/exportEntities";

class UsuarioController{

    consultarUsuarioPorId = (id: string) => {
        return usuarioBusiness.consultarUsuarioPorId(id);
    }

    ConsultarUsuarioPorCpfCnpj = (cpf_cnpj: string) => {
        return usuarioBusiness.ConsultarUsuarioPorCpfCnpj(cpf_cnpj);
    }

    salvarUsuario = (usuario: Usuario) => {
        return usuarioBusiness.salvarUsuario(usuario);
    }

    editarUsuario = (id: string, usuario: Usuario) => {
        return usuarioBusiness.editarUsuario(id, usuario);
    }

    desativarUsuario = (id: string) => {
        return usuarioBusiness.desativarUsuario(id);
    }
}

export const usuariocontroller = new UsuarioController();