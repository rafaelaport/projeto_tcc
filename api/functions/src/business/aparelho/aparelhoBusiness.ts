import { aparelhoDataSource } from "../../datasource/exportDatasource";
import { Aparelho } from "../../entities/exportEntities";
import { historicoBusiness } from "../exportBusiness";

class AparelhoBusiness {

    consultarTodosAparelhos = () => {
        return aparelhoDataSource.consultarTodosAparelhos();
    }

    consultarAparelhosPorUsuario = (cpf_cnpj: string) => {
        return aparelhoDataSource.consultarAparelhosPorUsuario(cpf_cnpj);
    }

    consultarAparelhoPorId = (id: string) => {
        return aparelhoDataSource.consultarAparelhoPorId(id);
    }

    salvarAparelho = (aparelho: Aparelho) => {
        aparelho.ativo = true;
        return aparelhoDataSource.salvarAparelho(aparelho);
    }

    editarAparelho = (id: string, aparelho: Aparelho) => {
        aparelho.ativo = true;
        return aparelhoDataSource.editarAparelho(id, aparelho);
    }

    desativarAparelho = async (id: string) => {

        await historicoBusiness.desativarHistoricoPorAparelho(id);

        return aparelhoDataSource.desativarAparelho(id);
    }

}

export const aparelhoBusiness = new AparelhoBusiness();