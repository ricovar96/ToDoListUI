import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskEditDialogComponent } from '../task-edit-dialog/task-edit-dialog.component';
import { TaskAddDialogComponent } from '../task-add-dialog/task-add-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  OriginTasks: Task[] = [];
  tasks: Task[] = [];
  selectedFilter: string = 'all';

  constructor(private taskService: TaskService, private modalService: NgbModal) {}

  applyFilter(): void {
    switch (this.selectedFilter) {
      case 'priority':
        this.tasks = this.OriginTasks.sort((a, b) => b.levelImportance - a.levelImportance);
        break;
      case 'dateAsc':
        this.tasks = this.OriginTasks.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
        break;
      case 'urgent':
        this.tasks = this.OriginTasks.filter(task => task.isUrgent === true);
        break;
      case 'all':
      default:
        this.tasks = this.OriginTasks;
        break;
    }
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.OriginTasks = data;
    });
  }

  getPriorityClass(level: number): string {
    if (level === 1) {
      return 'low-priority';
    } else if (level === 2) {
      return 'medium-priority';
    } else {
      return 'high-priority';
    }
  }
  

  openEditDialog(task: Task): void {
    const modalRef = this.modalService.open(TaskEditDialogComponent, { centered: true });
    modalRef.componentInstance.task = { ...task }; 

    modalRef.result.then((updatedTask: Task) => {
      if (updatedTask) {
        this.taskService.updateTask(updatedTask.id, updatedTask).subscribe({
          next: () => {
            this.getTasks();
            Swal.fire(' Updated', 'The task was updated successfully.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'The task could not be updated.', 'error');
          }
        });
      }
    }).catch(() => {
    });
  }

  deleteTask(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe(() => {
          this.getTasks();
          Swal.fire('Deleted', 'The task has been deleted.', 'success');
        });
      }
    });
  }

  newTask = {
    taskName: '',
    taskDescription: '',
    endDate: '',
    isUrgent: false,
    levelImportance: 1
  };

  openCreateDialog() {
    const modalRef = this.modalService.open(TaskAddDialogComponent);
    modalRef.componentInstance.task = {} as Task;

    modalRef.result.then((newTask: Task) => {
      if (newTask) {
        this.addTask(newTask);
      }
    }).catch((error) => {
      console.log('Modal dismissed', error);
    });
  }

  addTask(newTask: Task) {
    this.taskService.addTask(newTask).subscribe(() => {
      this.getTasks();
      Swal.fire('Task Added', 'The task has been added successfully.', 'success');
    });
  }

  getImportanceLabel(value: number): string {
    switch (value) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return 'Unknown';
    }
  }
}
