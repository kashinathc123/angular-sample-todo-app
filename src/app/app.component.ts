import { Component, VERSION } from '@angular/core';
import { Board, List, Card } from './models/board.model';
import { BoardService } from './services/board.service';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  //https://material.angular.io/guide/getting-started

  board;


  constructor(private boardService:BoardService) {}
  
  ngOnInit() {
    this.board = this.boardService.getBoard();
  }


}
