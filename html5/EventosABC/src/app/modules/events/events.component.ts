import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/events.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any = {};
  environment = environment;

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.eventsService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }

}
