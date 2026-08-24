import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { DateService } from '../shared/date.service';
import { MomentPipe } from '../shared/moment.pipe';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, MomentPipe],
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit, OnDestroy {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faClock = faClock;
  date = new Date();
  private sub!: Subscription;

  constructor(public dateService: DateService) {}

  ngOnInit() {
    this.sub = interval(1000).subscribe(() => {
      this.date = new Date();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  go(dir: number) {
    this.dateService.changeMonth(dir);
  }
}
