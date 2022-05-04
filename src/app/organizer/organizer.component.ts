import {Component, OnInit} from '@angular/core';
import {DateService} from '../shared/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TasksService} from '../shared/tasks.service';
import {faTrashRestore, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: any
  tasks: Task[] = []
  indexTask: number = 0
  isOpen: boolean = false
  searchString: string = ''
  faTrashRestore = faTrashRestore
  faPenToSquare = faPenToSquare


  constructor(public dateService: DateService,
              public tasksService: TasksService) {
  }

  loadTask() {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })
  }

  ngOnInit() {
    this.loadTask()

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  submit() {
    const {title} = this.form.value

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    }

    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task)
      this.form.reset()
    }, err => console.error(err))
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }, err => console.error(err))
  }

  allowUpdate(task: Task) {
    this.isOpen = true
    this.indexTask = this.tasks.findIndex(elem => elem.id === task.id)
  }

  update(task: Task) {
    const {edit} = this.form.value

    this.tasksService.update(task).subscribe(() => {
      this.tasks = this.tasks[this.indexTask].title = edit
      this.isOpen = false
      this.loadTask()
    }, err => console.error(err))
  }
}
