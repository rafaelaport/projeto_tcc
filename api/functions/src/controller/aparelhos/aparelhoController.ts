import { aparelhoBusiness } from "../../business/exportBusiness";

class AparelhoController{

    consultarTodosAparelhos = () => {
        return aparelhoBusiness.consultarTodosAparelhos();
    }

    consultarAparelhoPorUsuario = (idUsuario: string) => {
        return aparelhoBusiness.consultarAparelhoPorUsuario(idUsuario);
    }

    consultarAparelhoPorId = (id: string) => {
        return aparelhoBusiness.consultarAparelhoPorId(id);
    }

}

export const aparelhoController = new AparelhoController();