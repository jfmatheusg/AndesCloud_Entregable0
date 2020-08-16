import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../../services/events.service';
import {EventsCategoriesEnum, EventsTypesEnum} from '../../enums/events.enum';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  idEvent: string;
  event: any = {};
  eventCategoriesEnum = EventsCategoriesEnum;
  eventTypesEnum = EventsTypesEnum;
  environment = environment;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
  ) { }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.params.pk;
    this.eventsService.getEvent(this.idEvent).subscribe(event => {
      this.event = event;
    });
  }

    deleteEvent(idEvent) {
    this.eventsService.deleteEvent(idEvent).subscribe(next => {
      this.router.navigate(['../']);
    });
  }

}
