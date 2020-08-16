export interface EventsInterface {
  count: number;
  next: any;
  previous: any;
  results: any[];
}

export interface EventTypeInterface {
  value: string;
  viewValue: string;
}

export interface EventInterface {
    event_name: string;
    event_category: string;
    event_place: string;
    event_address: string;
    event_initial_date: string;
    event_final_date: string;
    event_type: string;
    thumbnail: any;
}

