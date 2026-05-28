export interface IProduct{
    id : number;
    title: string;
    description : string;
    price : number;
    rating : number;
    stock : number;
    category : string;
    thumbnail : string;
}

// Pour la création — pas d'id car JSONPlaceholder le génère
export type IProductCreate = Omit<IProduct, 'id'>;

// Pour l'édition — tous les champs optionnels sauf id
export type IProductUpdate = Partial<IProductCreate> & { id: number };