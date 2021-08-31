import { usuarioBusiness } from "../../business/exportBusiness";
import { Usuario } from "../../interfaces/exportInterfaces";

class UsuarioController{

    consultarUsuarioPorId = (id: string) => {
        return usuarioBusiness.consultarUsuarioPorId(id);
    }

    salvarUsuario = (usuario: Usuario) => {
        return usuarioBusiness.salvarUsuario(usuario);
    }

    editarUsuario = (id: string, usuario: Usuario) => {
        return usuarioBusiness.editarUsuario(id, usuario);
    }

    excluirUsuario = (id: string) => {
        return usuarioBusiness.excluirUsuario(id);
    }
}

export const usuariocontroller = new UsuarioController();