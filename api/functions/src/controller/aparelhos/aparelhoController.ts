import { aparelhoBusiness } from "../../business/exportBusiness";

class AparelhoController{

    consultarTodosAparelhos = () => {
        return aparelhoBusiness.consultarTodosAparelhos();
    }

}

export const aparelhoController = new AparelhoController();