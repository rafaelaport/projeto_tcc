import { dataSourceAparelho } from "../../datasource/exportDatasource";

class AparelhoBusiness{

    getAparelhos = () => {
        return dataSourceAparelho.getAparelhos();
    }

}

export const aparelhoBusiness = new AparelhoBusiness();