import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EventsInterface} from '../interfaces/events.interface';
import {map} from 'rxjs/operators';


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

  createEvent(bodyIn) {

    let bodyOut: FormData = new FormData();
    bodyOut.append('event_name', bodyIn.event_name);
    bodyOut.append('event_category', bodyIn.event_category);
    bodyOut.append('event_place', bodyIn.event_place);
    bodyOut.append('event_address', bodyIn.event_address);
    bodyOut.append('event_initial_date', bodyIn.event_initial_date);
    bodyOut.append('event_final_date', bodyIn.event_final_date);
    bodyOut.append('event_type', bodyIn.event_type);
    bodyOut.append('thumbnail', bodyIn.thumbnail);

    return this.http.post<any>(`${environment.apiUrl}/events/`,  bodyOut);
  }
}
