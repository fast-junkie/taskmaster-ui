import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';

import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Observable } from 'rxjs';

const emptyTask: Task = {
  name: '',
  description: '',
  dueDate: new Date(),
  completed: false,
  project_id: 0,
  id: 0,
}

@Component({
  selector: 'tm-task-list',
  standalone: true,
  imports: [
    DatePipe,
    TaskFormComponent,
    AsyncPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  tasks$?: Observable<Task[]>;
  showModal: boolean = false;
  selectedTask: Task = emptyTask;
  formType: 'CREATE' | 'UPDATE' = 'CREATE';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks();
  }

  handleModalClose(type: 'SUBMIT' | 'CANCEL') {
    if (type === 'SUBMIT') {
      this.ngOnInit();
    }
    this.showModal = false;
  }

  handleTaskCompleted(id: number) {
    const task = this.tasks.findIndex(task => task.id === id);
    const updatedTask = this.tasks[task];
    updatedTask.completed = !updatedTask.completed;
    this.taskService.updateTask(updatedTask);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  updateTask(task: Task) {
    this.selectedTask = task;
    this.formType = 'UPDATE';
    this.showModal = true;
  }
}
