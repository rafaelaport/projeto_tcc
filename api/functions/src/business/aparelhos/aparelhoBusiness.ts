import { aparelhoDataSource } from "../../datasource/exportDatasource";

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

}

export const aparelhoBusiness = new AparelhoBusiness();