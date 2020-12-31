import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { CardModalComponent } from './card-modal/card-modal.component';
import { BoardService } from './services/board.service';
import { BoardComponent } from './board/board.component';
import { PriorityComponent } from './priority/priority.component';

import { RoutingModule } from './routing.module';

@NgModule({
  imports: [ BrowserModule, FormsModule, ReactiveFormsModule, DragDropModule, RoutingModule ],
  declarations: [ AppComponent, HelloComponent, CardModalComponent, BoardComponent, PriorityComponent],
  bootstrap:    [ AppComponent ],
  providers: [BoardService]
})
export class AppModule { }
