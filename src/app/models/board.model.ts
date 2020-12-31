export interface Board extends Array<List> {}
 
export interface List {
    id:number;
    name:string;
    cards: Card[]; 
}
            
export interface Card {
  id:number;
  title:string;
  content:string;
  priority:number;
}