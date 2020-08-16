import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventsCategoriesEnum, EventsTypesEnum} from '../../enums/events.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../../services/events.service';
import {ErrorRestService} from '../../services/error-rest/error-rest.service';
import {EventInterface} from '../../interfaces/events.interface';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-updateevent',
  templateUrl: './updateevent.component.html',
  styleUrls: ['./updateevent.component.css']
})
export class UpdateEventComponent implements OnInit {
  updateEventForm: FormGroup;
  loading = false;
  event: any = {};
  environment = environment;
  submitted = false;
  returnUrl: string;
  thumbnail: any;
  eventCategoriesEnum = EventsCategoriesEnum;
  eventCategories = [];
  eventTypesEnum = EventsTypesEnum;
  eventTypes = [];
  idEvent: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private errorDialogService: ErrorRestService,
  ) {}

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.params.pk;

    this.eventCategories = Object.keys(this.eventCategoriesEnum);
    this.eventTypes = Object.keys(this.eventTypesEnum);

    this.updateEventForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      event_category: ['', Validators.required],
      event_place: ['', Validators.required],
      event_address: ['', Validators.required],
      event_initial_date: ['', Validators.required],
      event_final_date: ['', Validators.required],
      event_type: ['', Validators.required],
    });

    this.eventsService.getEvent(this.idEvent).subscribe(event => {
      this.event = event;
      this.event.event_initial_date = this.event.event_initial_date.replace('Z', '');
      this.event.event_final_date = this.event.event_final_date.replace('Z', '');
      this.updateEventForm.setValue({
        event_name: this.event.event_name,
        event_category: this.event.event_category,
        event_place: this.event.event_place,
        event_address: this.event.event_address,
        event_initial_date: this.event.event_initial_date,
        event_final_date: this.event.event_final_date,
        event_type: this.event.event_type,
      });
    });


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }


  getErrorMessage(field) {
    const obj = this.f[field];
    return obj.hasError('required') ? 'El campo es requerido' :
        '';
  }

  get f() { return this.updateEventForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.updateEventForm.invalid) {
      return;
    }


    this.loading = true;
    this.eventsService
      .updateEvent(this.updateEventForm.value, this.idEvent)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
          const data = {
              reason: 'Su creación de evento no fue exitosa. Reintente más tarde o contacte a soporte técnico',
              status: '500'
          };
          this.errorDialogService.openDialog(data);
        }
      );
  }
}
