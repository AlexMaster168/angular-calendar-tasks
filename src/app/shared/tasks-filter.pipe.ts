import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './tasks.service';

@Pipe({
  name: 'tasksFilter',
  pure: false
})
export class TasksFilterPipe implements PipeTransform {
  transform(tasks: Task[], search: string = ''): Task[] {
    if (!search.trim()) return tasks;
    return tasks.filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }
}
