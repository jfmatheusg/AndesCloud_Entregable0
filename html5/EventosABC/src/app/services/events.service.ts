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

  createEvent(bodyIn) {

    const bodyOut: FormData = new FormData();
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

  deleteEvent(idEvent) {
    console.log(idEvent);
    return this.http.delete<any>(`${environment.apiUrl}/events/${idEvent}`);
  }

  getEvent(idEvent) {
    return this.http.get<EventsInterface>(`${environment.apiUrl}/events/${idEvent}`);
  }

  updateEvent(bodyIn, idEvent) {

    return this.http.put<any>(`${environment.apiUrl}/events/${idEvent}/`, this.toFormData(bodyIn));
  }


  toFormData<T>( formValue: T ) {
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      if (value) {formData.append(key, value); };

    }
    console.log(formData.get('thumbnail'));
    return formData;
  }
}
