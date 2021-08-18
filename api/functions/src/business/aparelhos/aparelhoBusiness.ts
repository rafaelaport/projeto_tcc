import { aparelhoDataSource } from "../../datasource/exportDatasource";

class AparelhoBusiness{

    getAparelhos = () => {
        return aparelhoDataSource.getAparelhos();
    }

}

export const aparelhoBusiness = new AparelhoBusiness();