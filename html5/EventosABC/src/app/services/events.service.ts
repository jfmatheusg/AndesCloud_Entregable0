import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EventsInterface} from '../interfaces/events.interface';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  environment = environment;

  constructor(
    private http: HttpClient
  ) { }

   getAllEvents(data: {} = {}) {
    return this.http.get<EventsInterface>(`${environment.apiUrl}/events/`);
  }
}
