import { Component } from '@angular/core';
import { SelectorComponent } from './selector/selector.component';
import { CalendarComponent } from './calendar/calendar.component';
import { OrganizerComponent } from './organizer/organizer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SelectorComponent, CalendarComponent, OrganizerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
