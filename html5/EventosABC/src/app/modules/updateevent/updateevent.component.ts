import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventsCategoriesEnum, EventsTypesEnum} from '../../enums/events.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../../services/events.service';
import {ErrorRestService} from '../../services/error-rest/error-rest.service';
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
      event_initial_date: ['', [Validators.required, this.dateValidator]],
      event_final_date: ['', [Validators.required, this.dateValidator]],
      event_initial_time: ['', Validators.required],
      event_final_time: ['', Validators.required],
      event_type: ['', Validators.required],
      thumbnail: [null]
    }, {validators:  this.validRangeDates('event_initial_date', 'event_final_date')});

    this.eventsService.getEvent(this.idEvent).subscribe(event => {
      this.event = event;
      this.event.event_initial_time = this.event.event_initial_date.substr(11, 5);
      this.event.event_final_time = this.event.event_final_date.substr(11, 5);
      this.event.event_initial_date = this.event.event_initial_date.substring(0, 10);
      this.event.event_final_date = this.event.event_final_date.substring(0, 10);

      this.updateEventForm.setValue({
        event_name: this.event.event_name,
        event_category: this.event.event_category,
        event_place: this.event.event_place,
        event_address: this.event.event_address,
        event_initial_date: this.event.event_initial_date,
        event_final_date: this.event.event_final_date,
        event_initial_time: this.event.event_initial_time,
        event_final_time: this.event.event_final_time,
        event_type: this.event.event_type,
        thumbnail: null
      });
    });


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }


  getErrorMessage(field) {
    const obj = this.f[field];
    return obj.hasError('required') ? 'El campo es requerido' :
      obj.hasError('pastDate') ? 'La fecha no puede estar en el pasado' :
        obj.hasError('finalDate') ? 'La fecha final no puede estar antes de la fecha inicial' :
        '';
  }

  validRangeDates(initialDateKey: string, finalDateKey: string) {
    return (group: FormGroup): void => {
      const initialDate = group.controls[initialDateKey];
      const finalDate = group.controls[finalDateKey];
      console.log(initialDate);
      console.log(finalDate);
      if (initialDate.value > finalDate.value && finalDate.value) {
        finalDate.setErrors({finalDate: true});
      }

    };
  }

  dateValidator(AC: AbstractControl) {
    const today = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).getTime();
    const dateIn = new Date(Number(AC.value.toString().substr(0, 4)),
                          Number(AC.value.toString().substr(5, 2)),
                          Number(AC.value.toString().substr(8, 2))).getTime();
    console.log('fuck you!!!');
    if (today > dateIn && AC.value) {
      AC.setErrors({pastDate: true});
      return {pastDate: true};
    }
  }

  get f() { return this.updateEventForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.updateEventForm.invalid) {
      return;
    }
    console.log(this.updateEventForm.controls.thumbnail)
    this.updateEventForm.controls.event_final_date.setValue( String(this.updateEventForm.controls.event_final_date.value) + 'T'
                                      + String(this.updateEventForm.controls.event_final_time.value));
    this.updateEventForm.controls.event_initial_date.setValue(String(this.updateEventForm.controls.event_initial_date.value) + 'T'
                                      + String(this.updateEventForm.controls.event_initial_time.value));

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
          this.errorDialogService.openDialog(data, resolve => {});
        }
      );
  }
}
