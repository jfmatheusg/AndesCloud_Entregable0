import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/events.service';
import {environment} from '../../../environments/environment';
import {EventsCategoriesEnum, EventsTypesEnum} from '../../enums/events.enum';

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
  detail = false;
  labelDetalle = 'Detalle Evento';

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.eventsService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }

  onClick() {
    this.detail = !this.detail;
    if (this.detail) { this.labelDetalle = 'Ocultar Detalle'; } else { this.labelDetalle = 'Detalle Evento'; }
  }

  deleteEvent(idEvent) {
    this.eventsService.deleteEvent(idEvent).subscribe(next => {
      location.reload();
    });
  }
}
