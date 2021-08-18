import { aparelhoDataSource } from "../../datasource/exportDatasource";

class AparelhoBusiness{

    consultarTodosAparelhos = () => {
        return aparelhoDataSource.consultarTodosAparelhos();
    }

}

export const aparelhoBusiness = new AparelhoBusiness();