export type ContactInfo = {
    id: string;
    name : string;
    phoneNumber: number | undefined;
    address: string | undefined;
    zipcode: string | undefined;
    city: string;
}

export type OrderType = {
    quantity: number,
    sendTo: string,
    productName: string,
    productId: string
}

export type IrisVariety = {
    "sepal.length": number, 
	"sepal.width": number, 
	"petal.length": number, 
	"petal.width":number
}

export type ContactContextParams = {
    contactList: ContactInfo[],
    setContactList: React.Dispatch<React.SetStateAction<ContactInfo[]>>
}


export type APIContextParams = {
    getContactData: ()=>Promise<any>
    storeContactData: (data : ContactInfo)=>Promise<any>
    getIrisClass: (data : IrisVariety)=>Promise<any>
    submitIrisOrder: (data : OrderType)=>Promise<any>
}


export type CardImageType = {
    Setosa : any,
    Virginica: any,
    Versicolor: any
}

