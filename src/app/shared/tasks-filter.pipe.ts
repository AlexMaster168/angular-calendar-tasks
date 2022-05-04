import {Pipe, PipeTransform} from '@angular/core';
import {Task} from './tasks.service';

@Pipe({
  name: 'tasksFilter'
})
export class TasksFilterPipe implements PipeTransform {
  transform(task: Task[], search: string = ''): Task[] {
    if (!search.trim()) return task

    return task.filter(elem => {
      return elem.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
  }

}
