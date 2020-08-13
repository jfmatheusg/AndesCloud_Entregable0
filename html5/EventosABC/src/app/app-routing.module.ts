import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from './modules/events/events.component';
import {LoginComponent} from './modules/login/login.component';
import {RegisterComponent} from './modules/register/register.component';
import {PageNotFoundComponent} from './modules/page-not-found/page-not-found.component';
import {AuthGuardService} from './services/auth-guard.service';
import {CreateEventComponent} from './modules/createevent/createevent.component';


const routes: Routes = [
  {path: '', component: EventsComponent, canActivate: [AuthGuardService]},
  {path: 'create', component: CreateEventComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
