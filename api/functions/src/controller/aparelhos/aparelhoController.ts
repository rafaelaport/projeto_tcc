import { aparelhoBusiness } from "../../business/exportBusiness";
import { Aparelho } from "../../interfaces/exportInterfaces";

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

    salvarAparelho = (aparelho: Aparelho) => {
        return aparelhoBusiness.salvarAparelho(aparelho);
    }

    editarAparelho = (id: string, aparelho: Aparelho) => {
        return aparelhoBusiness.editarAparelho(id, aparelho);
    }

    excluirAparelho = (id: string) => {
        return aparelhoBusiness.excluirAparelho(id);
    }

}

export const aparelhoController = new AparelhoController();