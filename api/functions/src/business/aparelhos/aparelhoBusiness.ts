import { aparelhoDataSource } from "../../datasource/exportDatasource";

class AparelhoBusiness{

    consultarTodosAparelhos = () => {
        return aparelhoDataSource.consultarTodosAparelhos();
    }

    consultarAparelhoPorUsuario = (idUsuario: string) => {
        return aparelhoDataSource.consultarAparelhoPorUsuario(idUsuario);
    }

    consultarAparelhoPorId = (id: string) => {
        return aparelhoDataSource.consultarAparelhoPorId(id);
    }

}

export const aparelhoBusiness = new AparelhoBusiness();