import { aparelhoBusiness } from "../../business/exportBusiness";
import { Aparelho } from "../../entities/exportEntities";

class AparelhoController{

    consultarTodosAparelhos = () => {
        return aparelhoBusiness.consultarTodosAparelhos();
    }

    consultarAparelhosPorUsuario = (cpf_cnpj: string) => {
        return aparelhoBusiness.consultarAparelhosPorUsuario(cpf_cnpj);
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

    desativarAparelho = (id: string) => {
        return aparelhoBusiness.desativarAparelho(id);
    }

}

export const aparelhoController = new AparelhoController();