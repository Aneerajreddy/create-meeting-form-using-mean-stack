import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';
import {EditMeetingComponent  } from './components/edit-meeting/edit-meeting.component';
import { MeetingsListComponent } from './components/meetings-list/meetings-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-meeting' },
  { path: 'add-meeting', component: AddMeetingComponent},
  { path: 'edit-meeting/:id', component: EditMeetingComponent  },
  { path: 'meetings-list', component: MeetingsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }