import {Component, OnInit} from '@angular/core';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {DateService} from "../shared/date.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit{
  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight
  date = new Date()

  constructor(public dateService: DateService) {
  }

  ngOnInit() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  go(dir: number) {
     this.dateService.changeMonth(dir)
  }

}
