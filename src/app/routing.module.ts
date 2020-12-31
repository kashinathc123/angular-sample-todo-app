import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { BoardComponent } from "./board/board.component";
// import { InfoComponent } from './info/info.component';
// import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [{ path: "", component: BoardComponent }]; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
