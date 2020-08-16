import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from './modules/events/events.component';
import {LoginComponent} from './modules/login/login.component';
import {RegisterComponent} from './modules/register/register.component';
import {PageNotFoundComponent} from './modules/page-not-found/page-not-found.component';
import {AuthGuardService} from './services/auth-guard.service';
import {CreateEventComponent} from './modules/createevent/createevent.component';
import {UpdateEventComponent} from './modules/updateevent/updateevent.component';
import {EventDetailComponent} from './modules/event-detail/event-detail.component';


const routes: Routes = [
  { path: '', component: EventsComponent, canActivate: [AuthGuardService]},
  { path: 'create', component: CreateEventComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent, },
  { path: 'update/:pk', component: UpdateEventComponent, canActivate: [AuthGuardService]},
  { path: ':pk', component: EventDetailComponent, canActivate: [AuthGuardService]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
