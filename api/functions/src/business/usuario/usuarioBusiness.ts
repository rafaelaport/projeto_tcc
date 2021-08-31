import { usuarioDataSource } from "../../datasource/exportDatasource";
import { Usuario } from "../../interfaces/exportInterfaces";

class UsuarioBusiness{
    
    consultarUsuarioPorId = (id: string) => {
        return usuarioDataSource.consultarUsuarioPorId(id);
    }

    salvarUsuario = (usuario: Usuario) => {
        return usuarioDataSource.salvarUsuario(usuario);
    }

    editarUsuario = (id: string, usuario: Usuario) => {
        return usuarioDataSource.editarUsuario(id, usuario);
    }

    excluirUsuario = (id: string) => {
        return usuarioDataSource.excluirUsuario(id);
    }

}

export const usuarioBusiness = new UsuarioBusiness();