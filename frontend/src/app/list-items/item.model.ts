export interface ItemsDTO{
   id:number,
   title: string,
   description: string,
   icon?: string,
   amount?: number,
   price: number,
   totalPrice?: number,
}
export interface LocalValues{
   id:number,
   amount: number,
}