import { usuarioDataSource } from "../../datasource/exportDatasource";

class UsuarioBusiness{
    
    consultarUsuarioPorId = (id: string) => {
        return usuarioDataSource.consultarUsuarioPorId(id);
    }

}

export const usuarioBusiness = new UsuarioBusiness();