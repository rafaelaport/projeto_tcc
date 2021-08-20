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

    criarAparelho = (aparelho: Aparelho) => {
        return aparelhoBusiness.criarAparelho(aparelho);
    }

    alterarAparelho = (id: string, aparelho: Aparelho) => {
        return aparelhoBusiness.alterarAparelho(id, aparelho);
    }

    excluirAparelho = (id: string) => {
        return aparelhoBusiness.excluirAparelho(id);
    }

}

export const aparelhoController = new AparelhoController();