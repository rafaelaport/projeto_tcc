import { usuarioBusiness } from "../../business/exportBusiness";

class UsuarioController{

    consultarUsuarioPorId = (id: string) => {
        return usuarioBusiness.consultarUsuarioPorId(id);
    }
}

export const usuariocontroller = new UsuarioController();