import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  event = {
    name: '',
    description: '',
    date: '',
    organizerid: 0,
    status: 'PENDING'
  };
  submitted = false;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  saveEvent(): void {
    const data = {
      name: this.event.name,
      description: this.event.description,
      date: this.event.date,
      organizerid: 0,
      status: 'PENDING'
    };

    this.eventService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newEvent(): void {
    this.submitted = false;
    this.event = {
      name: '',
      description: '',
      date: '',
      organizerid: 0,
      status: 'PENDING'
    };
  }

}
