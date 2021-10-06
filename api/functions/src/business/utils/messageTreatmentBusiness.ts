import { MessageTreatment } from "../../entities/exportEntities";

class MessageTreatmentBusiness{

    sucessMsg = (message: string, response?: any): MessageTreatment => {
        let _message: MessageTreatment = {message: `Sucesso: ${message}`, status: 200, response: response};
        //console.log(_message);
        return _message;
    }

    infoMsg = (message: string, info?: any) => {
        let _message: MessageTreatment = {message: `Atenção: ${message}`, status: 400, response: info};
        //console.log(_message);
        return _message;
    }

    errorMsg = (message: string, error?: any) => {
        let _message: MessageTreatment = {message: `Error: ${message}`, status: 500, response: error};
        //console.log(_message);
        return _message;
    }

}

export const messageTreatmentBusiness = new MessageTreatmentBusiness();