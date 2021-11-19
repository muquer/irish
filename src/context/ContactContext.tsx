import { createContext } from "react";
import { ContactContextParams } from "../../types/types";

let contactData: ContactContextParams = {
    contactList: [],
    setContactList: () => {
        throw new Error("Function not implemented.");
    },
}

export const contactContext = createContext(contactData);

export const ContactProvider = contactContext.Provider;
export const ContactConsumer = contactContext.Consumer;