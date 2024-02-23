export type TUser = {
    id: string | number,
    name:string,
    email: string,
    password: string | number,
    createdAt: string //no formato ano-mês-dia T hora:minuto:segundo:milésimo-de-segundos Z
}

export type TProduct = {
    id: string | number,
    name:string,
    price: number,
    description: string,
    imageUrl: string
}


export type TPurchase = {
    id: string,
    buyer: string,
    total_price: string,
    created_at: string
}
