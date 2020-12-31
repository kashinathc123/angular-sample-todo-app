import { Injectable } from "@angular/core";
import { data } from "../models/data";
import { Board, Card } from "../models/board.model";
import { Subject, BehaviorSubject, Observable } from "rxjs";

/*
   Une class de type Service permet de partager du code entre les components

   Elle expose des data et des méthodes, que les components pourront consommer via le mécanisme d'injection de dépendance

   DI: https://angular.io/guide/dependency-injection
   
   Une utilisation courante des services est le partage de l'accès aux données de l'application via des metthodes accesseurs
*/

@Injectable()
export class BoardService {
  constructor() {}

  // On importe la donnée depuis /src/app/models/data
  private data: Board = data;

  /*
    We create 2 subjects
    The particularity of the subjects (RxJs library) is:
    - We can push data in value
    (Syntax: subject.next (data))
    - We can subscribe to this subject and react as soon as the data changes
    (Syntax: subject.subscribe ())

    This allows to set up a reactive system between the components, based on the change of value of a data.

    -> If a component modifies the data
    -> other components can react to it
    (to update the display linked to this data for example)
  */
  private priorityCards$ = new BehaviorSubject<Card[]>(
    this.initializePriorityCards()
  );
  private modalState$ = new Subject();

  /*
   Get the data table
  */
  getBoard(): Board {
    return this.data;
  }

  /*
Add a card to the board
  */
  addCard(listId, cardTitle): void {
    let list = this.data.find(list => list.id == listId);
    list.cards = [
      { id: Date.now(), title: cardTitle, content: "", priority: 3 },
      ...list.cards
    ];
    this.setPriorityCards();
  }

  /*
    Remove a card from the board
  */
  deleteCard(listId, cardId): void {
    let list = this.data.find(list => list.id == listId);
    console.log(list);
    let card = list.cards.find(card => card.id == cardId);
    console.log(card);
    let index = list.cards.indexOf(card);
    list.cards.splice(index, 1);
    this.setPriorityCards();
  }

  /*    
Update a card
  */
  updateCard(listIndex, cardIndex, newCard): void {
    this.data[listIndex].cards[cardIndex] = newCard;
    this.setPriorityCards();
  }

  /*    
Add new list
  */
  addList(listName): void {
    this.data.push({ id: Date.now(), name: listName, cards: [] });
  }

  /*
   Delete a list
  */
  deleteList(listId): void {
    let list = this.data.find(list => list.id == listId);
    let index = this.data.indexOf(list);
    this.data.splice(index, 1);
    this.setPriorityCards();
  }

  /*    
Initialize the list of urgent cards
    return: array of Card
  */
  initializePriorityCards(): Card[] {
    let cards = [];
    for (let list of this.data) {
      for (let card of list.cards) {
        if (card.priority === 1) {
          cards.push(card);
        }
      }
    }
    return cards;
  }

  /*
  update the subject this.priorityCards $
   (a subject is able to modify the value it contains with the .next () method)
  */
  setPriorityCards(): void {
    let cards: Card[] = [];
    for (let list of this.data) {
      for (let card of list.cards) {
        if (card.priority === 1) {
          cards.push(card);
        }
      }
    }
    this.priorityCards$.next(cards);
  }

  /*
    Get the subject priorityCards $
    components that use this method will be able to subscribe to the subject through .subsribe ()
    This will have the effect of signaling to the component any change in the value of the Subject
    thanks to the reactive programming principle of RxJs
  */
  getPriorityCards() {
    return this.priorityCards$;
  }

  /*
   Set the modal state that displays a cardId
    Param 1: true or false
    Param 2: card: Card
    (used by PriorityComponent component)
  */
  setModalState(bool: boolean, card: Card): void {
    let state = {
      open: bool,
      card: card
    };
    this.modalState$.next(state);
  }

  /*   
return the subject of modalState
    a compoment can subscribe
    (used by the BoardComponent component)
  */
  getModalState() {
    return this.modalState$;
  }
}
