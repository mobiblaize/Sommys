import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterCourseRoutingModule } from './master-course-routing.module';
import { MasterCourseComponent } from './master-course/master-course.component';


@NgModule({
  declarations: [MasterCourseComponent],
  imports: [
    CommonModule,
    MasterCourseRoutingModule
  ]
})
export class MasterCourseModule { }
