import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'tm-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnChanges{
  @Input() currentTask: Task | null = null;
  @Input() formType: 'CREATE' | 'UPDATE' = 'CREATE';
  @Output() closePanel: EventEmitter<'SUBMIT' | 'CANCEL'> = new EventEmitter<'SUBMIT' | 'CANCEL'>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      completed: [false],
      id: [0],
      project_id: [0],
    });
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes['currentTask'] && changes['currentTask'].currentValue) {
      const task = changes['currentTask'].currentValue as Task;
      console.debug('task', task, task.dueDate);
      const dueDate: string = (task.dueDate)
        ? this.formatDate(task.dueDate.toString())
        : '';
      this.taskForm.patchValue({
        ...task,
        dueDate,
      })
    }
  }

  handleSubmit() {
    if (this.taskForm.valid) {
      console.debug('completed', this.taskForm.value);
      const task: Task = {
        ...this.taskForm.value,
        dueDate: new Date(this.taskForm.value.dueDate),
        completed: this.formType === 'UPDATE' ? this.taskForm.value.completed : false,
      };

      if (this.formType === 'CREATE') {
        this.taskService.addTask(task).subscribe(() => {
          this.closePanel.emit('SUBMIT');
        });
      } else {
        this.taskService.updateTask(task).subscribe(() => {
          this.closePanel.emit('SUBMIT');
        });
      }

    }
  }

  handleCancel() {
    this.closePanel.emit('CANCEL');
  }

  private formatDate(date: string): string {
    const taskDueDate = new Date(date);
    const estDate: string = taskDueDate.toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const [month, day, year] = estDate.split('/');
    return `${year}-${month}-${day}`;
  }
}
