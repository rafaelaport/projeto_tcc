import { aparelhoBusiness } from "../../business/exportBusiness";

class AparelhoController{

    consultarTodosAparelhos = () => {
        return aparelhoBusiness.consultarTodosAparelhos();
    }

    consultarAparelhosPorUsuario = (idUsuario: string) => {
        return aparelhoBusiness.consultarAparelhosPorUsuario(idUsuario);
    }

    consultarAparelhoPorId = (id: string) => {
        return aparelhoBusiness.consultarAparelhoPorId(id);
    }

}

export const aparelhoController = new AparelhoController();