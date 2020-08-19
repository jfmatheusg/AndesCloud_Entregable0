import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../../services/events.service';
import {EventsCategoriesEnum, EventsTypesEnum} from '../../enums/events.enum';
import {ErrorRestService} from '../../services/error-rest/error-rest.service';

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
    public errorDialogService: ErrorRestService
  ) { }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.params.pk;
    const subscription = this.eventsService.getEvent(this.idEvent).subscribe(event => {
      this.event = event;
    }, error => {
      console.log(error)
      const status = error.status;
      let reason = ''
      if (status === 401) {reason = 'El usuario no tiene permisos para ver este evento'};
      if (status === 404) {reason = 'El evento buscado no existe en el sistema'};
      this.errorDialogService.openDialog({status, reason}, resolve => {this.router.navigate(['../']); }); });
  }

    deleteEvent(idEvent) {
    this.eventsService.deleteEvent(idEvent).subscribe(next => {
      this.router.navigate(['../']);
    });
  }

}
