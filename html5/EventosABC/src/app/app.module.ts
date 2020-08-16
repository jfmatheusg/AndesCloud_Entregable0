import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './modules/events/events.component';
import { HomeComponent } from './modules/home/home.component';
import {UserSessionService} from './services/user-session.service';
import {AuthenticationService} from './services/authentication.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './modules/login/login.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';
import { ErrorRestComponent } from './services/error-rest/error-rest.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ErrorRestService} from './services/error-rest/error-rest.service';
import { RegisterComponent } from './modules/register/register.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { CreateEventComponent } from './modules/createevent/createevent.component';
import {MatSelectModule} from '@angular/material/select';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { UpdateEventComponent } from './modules/updateevent/updateevent.component';
import { FileUploadComponent } from './services/file-upload/file-upload.component';
import { EventDetailComponent } from './modules/event-detail/event-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    HomeComponent,
    LoginComponent,
    ErrorRestComponent,
    RegisterComponent,
    PageNotFoundComponent,
    CreateEventComponent,
    UpdateEventComponent,
    FileUploadComponent,
    EventDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    NgbModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    UserSessionService,
    AuthenticationService,
    FormBuilder,
    ErrorRestService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    public user: UserSessionService,
    private authenticationService: AuthenticationService
  ) {
    if (localStorage.getItem('user')) {
      user.profile = JSON.parse(localStorage.getItem('user'));
      user.ok = true;
    }
  }
}
