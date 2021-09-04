import { aparelhoDataSource } from "../../datasource/exportDatasource";
import { Aparelho } from "../../interfaces/exportInterfaces";

class AparelhoBusiness{

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
        return aparelhoDataSource.salvarAparelho(aparelho);
    }

    editarAparelho = (id: string, aparelho: Aparelho) => {
        return aparelhoDataSource.editarAparelho(id, aparelho);
    }

    excluirAparelho = (id: string) => {
        return aparelhoDataSource.excluirAparelho(id);
    }

}

export const aparelhoBusiness = new AparelhoBusiness();