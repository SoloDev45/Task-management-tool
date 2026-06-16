import { useCallback } from 'react';
import type { Task, TaskStatus } from '../types/task';
import { useLocalStorage } from './useLocalStorage';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const SEED_TASKS: Task[] = [
  {
    id: 'seed-1',
    title: 'Fix login page bug',
    description:
      'Users are unable to log in when caps lock is on. Investigate and fix the password validation logic.',
    status: 'in-progress',
    createdAt: 'Mon 1, April 2026',
  },
  {
    id: 'seed-2',
    title: 'Implement dark mode',
    description:
      'Add a dark mode toggle to the settings page and persist the preference in local storage.',
    status: 'in-progress',
    createdAt: 'Tue 2, April 2026',
  },
  {
    id: 'seed-3',
    title: 'Write API documentation',
    description:
      'Document all REST endpoints using Swagger. Include request/response examples for each route.',
    status: 'pending',
    createdAt: 'Tue 2, April 2026',
  },
  {
    id: 'seed-4',
    title: 'Add email notifications',
    description:
      'Send email alerts to users when a task is assigned to them or its status changes.',
    status: 'pending',
    createdAt: 'Wed 3, April 2026',
  },
  {
    id: 'seed-5',
    title: 'Project scaffolding',
    description:
      'Initialised the React + TypeScript project with Vite, configured Tailwind CSS and ESLint.',
    status: 'completed',
    createdAt: 'Sat 29, March 2026',
  },
  {
    id: 'seed-6',
    title: 'User authentication',
    description:
      'Implemented JWT-based login and registration with token refresh and protected routes.',
    status: 'completed',
    createdAt: 'Sun 30, March 2026',
  },
  {
    id: 'seed-7',
    title: 'Dashboard UI',
    description:
      'Built the main dashboard layout with task summary cards, status filters, and responsive design.',
    status: 'completed',
    createdAt: 'Mon 31, March 2026',
  },
];

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', SEED_TASKS);

  const addTask = useCallback(
    (title: string, description: string) => {
      const newTask: Task = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        status: 'pending',
        createdAt: formatDate(new Date()),
      };
      setTasks((prev) => [newTask, ...prev]);
      return newTask.id;
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks]
  );

  const getTasksByStatus = useCallback(
    (status: TaskStatus, query: string) => {
      const q = query.toLowerCase();
      return tasks.filter(
        (t) =>
          t.status === status &&
          (q === '' || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
      );
    },
    [tasks]
  );

  return { tasks, addTask, updateTask, deleteTask, getTasksByStatus };
}
