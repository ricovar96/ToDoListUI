export interface Task {
    id?: number;
    taskName: string;
    taskDescription: string;
    endDate: string;
    isUrgent: boolean;
    levelImportance: number;
  }