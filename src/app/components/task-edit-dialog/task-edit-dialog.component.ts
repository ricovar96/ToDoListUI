import { Component} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../models/task';
import { Input } from '@angular/core';

@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.css']
})
export class TaskEditDialogComponent {
  @Input() task: Task = {} as Task;

  levels = [1, 2, 3]; 

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {

    if (this.task.endDate) {
      this.task.endDate = this.formatDate(this.task.endDate);
    }
  }

  save(): void {

    if (!this.task.taskName || !this.task.taskDescription) {
      alert('Please complete all fields.');
      return;
    }

    this.activeModal.close(this.task);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

}
