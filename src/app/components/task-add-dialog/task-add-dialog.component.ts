import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { Task } from '../../models/task'; 
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-task-add-dialog',
  templateUrl: './task-add-dialog.component.html',
  styleUrls: ['./task-add-dialog.component.css']
})
export class TaskAddDialogComponent {

  task: Task = {
    taskName: 'test',
    taskDescription: '',
    endDate: '',
    isUrgent: false,
    levelImportance: 1
  };

  ngOnInit(): void {
    this.task.endDate = this.getTodayDate();
  }

  constructor(public activeModal: NgbActiveModal) {} 

  onCancel(): void {
    this.activeModal.dismiss(); 
  }

  onSave(): void {
    if (!this.task.taskName || !this.task.taskDescription) {
      Swal.fire('Error', 'Fields cannot be empty', 'error');
      return;
    }

    this.activeModal.close(this.task);

    Swal.fire('Task Created', 'The task has been created successfully', 'success');
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

}
