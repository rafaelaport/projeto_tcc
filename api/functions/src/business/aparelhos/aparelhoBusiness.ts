import { aparelhoDataSource } from "../../datasource/exportDatasource";
import { Aparelho } from "../../interfaces/exportInterfaces";

class AparelhoBusiness{

    consultarTodosAparelhos = () => {
        return aparelhoDataSource.consultarTodosAparelhos();
    }

    consultarAparelhosPorUsuario = (idUsuario: string) => {
        return aparelhoDataSource.consultarAparelhosPorUsuario(idUsuario);
    }

    consultarAparelhoPorId = (id: string) => {
        return aparelhoDataSource.consultarAparelhoPorId(id);
    }

    criarAparelho = (aparelho: Aparelho) => {
        return aparelhoDataSource.criarAparelho(aparelho);
    }

    alterarAparelho = (id: string, aparelho: Aparelho) => {
        return aparelhoDataSource.alterarAparelho(id, aparelho);
    }

    excluirAparelho = (id: string) => {
        return aparelhoDataSource.excluirAparelho(id);
    }

}

export const aparelhoBusiness = new AparelhoBusiness();