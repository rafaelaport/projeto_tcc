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