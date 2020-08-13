import { Component, OnInit } from '@angular/core';
import {EventTypeInterface} from '../../interfaces/events.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventInterface} from '../../interfaces/events.interface';
import {first} from 'rxjs/operators';
import {EventsService} from '../../services/events.service';
import {ErrorRestService} from '../../services/error-rest/error-rest.service';

@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})
export class CreateEventComponent implements OnInit {
  createEventForm: FormGroup;
  loading = false;
  hide = true;
  submitted = false;
  returnUrl: string;
  thumbnail: any;
  eventCategories: EventTypeInterface[] = [
    {value: 'CONFERENCE', viewValue: 'Conferencia'},
    {value: 'SEMINAR', viewValue: 'Seminario'},
    {value: 'CONGRESS', viewValue: 'Congreso'},
    {value: 'CURSE', viewValue: 'Curso'},
  ];
  evenTypes: EventTypeInterface[] = [
    {value: 'PRESENCIAL', viewValue: 'Presencial'},
    {value: 'VIRTUAL', viewValue: 'Virtual'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private errorDialogService: ErrorRestService
  ) {}

  ngOnInit(): void {
    this.createEventForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      event_category: ['', Validators.required],
      event_place: ['', Validators.required],
      event_address: ['', Validators.required],
      event_initial_date: ['', Validators.required],
      event_final_date: ['', Validators.required],
      event_type: ['', Validators.required],
      thumbnail: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  selectFile(event) {
    this.thumbnail = event.target.files;
  }

  getErrorMessage(field) {
    const obj = this.f[field];
    return obj.hasError('required') ? 'El campo es requerido' :
        '';
  }

  get f() { return this.createEventForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createEventForm.invalid) {
      return;
    }


    const newEventData: EventInterface = this.createEventForm.value;
    newEventData.thumbnail = this.thumbnail.item(0);


    this.loading = true;
    this.eventsService
      .createEvent(newEventData)
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
