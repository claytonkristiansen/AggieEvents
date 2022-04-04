import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-organizer-events',
  templateUrl: './organizer-events.component.html',
  styleUrls: ['./organizer-events.component.css']
})
export class OrganizerEventsComponent implements OnInit {
  events: any;
  currentEvent: any = null;
  currentIndex = -1;
  name = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getAll()
      .subscribe(
        response => {
          this.events = response;
          console.log(response);
        },
        error => {
          console.log(error)
        });
  }

  refreshEvents(): void {
    this.getEvents();
    this.currentEvent = null;
    this.currentIndex = -1;
  }

  setActiveEvent(event: { name: string; description: string; date: string }, index: number): void {
    this.currentEvent = event;
    this.currentIndex = index;
  }

}
