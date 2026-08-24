import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashRestore, faPenToSquare, faPlus, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { DateService } from '../shared/date.service';
import { TasksService, Task } from '../shared/tasks.service';
import { MomentPipe } from '../shared/moment.pipe';
import { TasksFilterPipe } from '../shared/tasks-filter.pipe';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule, MomentPipe, TasksFilterPipe],
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form!: FormGroup;
  editForm!: FormGroup;
  tasks: Task[] = [];
  indexTask = 0;
  isOpen = false;
  searchString = '';
  faTrashRestore = faTrashRestore;
  faPenToSquare = faPenToSquare;
  faPlus = faPlus;
  faXmark = faXmark;
  faCheck = faCheck;

  constructor(
    public dateService: DateService,
    public tasksService: TasksService
  ) {}

  loadTask() {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnInit() {
    this.loadTask();
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    this.editForm = new FormGroup({
      edit: new FormControl('', [Validators.required])
    });
  }

  submit() {
    const { title } = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };
    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset();
    }, err => console.error(err));
  }

  remove(task: Task) {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }, err => console.error(err));
  }

  allowUpdate(task: Task) {
    this.isOpen = true;
    this.indexTask = this.tasks.findIndex(elem => elem.id === task.id);
    this.editForm.patchValue({ edit: task.title });
  }

  update(task: Task) {
    const { edit } = this.editForm.value;
    const updated = { ...task, title: edit };
    this.tasksService.update(updated).subscribe(() => {
      this.tasks[this.indexTask].title = edit;
      this.isOpen = false;
    }, err => console.error(err));
  }
}
