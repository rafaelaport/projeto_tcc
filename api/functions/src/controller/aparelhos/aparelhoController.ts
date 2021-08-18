import { aparelhoBusiness } from "../../business/exportBusiness";

class AparelhoController{

    getAparelhos = () => {
        return aparelhoBusiness.getAparelhos();
    }

}

export const aparelhoController = new AparelhoController();