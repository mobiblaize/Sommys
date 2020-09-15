import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterCourseComponent } from './master-course/master-course.component';


const routes: Routes = [
  { path: '', component: MasterCourseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCourseRoutingModule { }
