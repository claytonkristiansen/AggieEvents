import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-changing-event',
  templateUrl: './changing-event.component.html',
  styleUrls: ['./changing-event.component.css']
})
export class ChangingEventComponent implements OnInit {
  currentEvent: any = null
  message = '';
  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private Router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getEvent(this.route.snapshot.paramMap.get('id'));
  }

  getEvent(id: any) {
    this.eventService.get(id)
      .subscribe(
        response => {
          this.currentEvent = response;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateEvent(): void {
    this.eventService.update(this.currentEvent.id, this.currentEvent)
      .subscribe(
        response => {
          console.log(response);
          this.message = "Modification Successful";
        },
        error => {
          console.log(error);
        });
  }

  deleteEvent(): void {
    this.eventService.delete(this.currentEvent.id)
      .subscribe(
        response => {
          console.log(response);
          this.message = "Deletion Successful";
        },
        error => {
          console.log(error);
        });
  }


}
