import { createContext } from "react";
import { APIContextParams, ContactContextParams } from "../../types/types";

let APIParams: APIContextParams = {
    getContactData: () => {
        throw new Error("Function not implemented.");
    },
    storeContactData: () => {
        throw new Error("Function not implemented.");
    },
    getIrisClass: () => {
        throw new Error("Function not implemented.");
    },
    submitIrisOrder: () => {
        throw new Error("Function not implemented.");
    }
}

export const apiContext = createContext(APIParams);

export const APIProvider = apiContext.Provider;
export const APIConsumer = apiContext.Consumer;