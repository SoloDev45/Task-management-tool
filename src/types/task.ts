export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export const STATUS_COLORS: Record<TaskStatus, string> = {
  pending: '#9ca3af',
  'in-progress': '#f59e0b',
  completed: '#22c55e',
};

export const ALL_STATUSES: TaskStatus[] = ['in-progress', 'pending', 'completed'];
