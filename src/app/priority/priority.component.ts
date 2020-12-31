import { Component, OnInit, Input } from '@angular/core';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent implements OnInit {

  cards;

  constructor(private boardService:BoardService) { }

  ngOnInit() {
    this.boardService.getPriorityCards().subscribe( data => this.cards = data);
  }

  getDetailAction(card) {
    this.boardService.setModalState(true, card);
  }

}