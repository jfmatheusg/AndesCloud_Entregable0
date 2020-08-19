import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/events.service';
import {environment} from '../../../environments/environment';
import {EventsCategoriesEnum, EventsTypesEnum} from '../../enums/events.enum';
import {ErrorRestService} from "../../services/error-rest/error-rest.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any = {};
  environment = environment;
  eventCategoriesEnum = EventsCategoriesEnum;
  eventTypesEnum = EventsTypesEnum;
  labelDetalle = 'Detalle Evento';

  constructor(
    private eventsService: EventsService,
    private errorDialogService: ErrorRestService
  ) { }

  ngOnInit() {
    this.eventsService.getAllEvents().subscribe(events => {
      this.events = events;
    }, error => {
      const data = {
        status: 404,
        reason: 'El usuario no tiene eventos en el sistema'
      };
      this.errorDialogService.openDialog(data, resolve => {}); });
  }

  deleteEvent(idEvent) {
    this.eventsService.deleteEvent(idEvent).subscribe(next => {
      location.reload();
    });
  }
}
