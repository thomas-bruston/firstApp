export interface IProductComment{
    id : number;
    body : string;
    postId : number;
    likes : number;
    user:{
        id : number;
        userName : string;
        fullName : string;
    }
}

export type ICommentCreate = {
  body: string;
  postId: number;
  userId: number;
}