import { useState, useCallback } from 'react';
import type { Task, TaskStatus } from '../types/task';

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
    title: 'Lorem Ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: 'in-progress',
    createdAt: 'Wed 31, July 2024',
  },
  {
    id: 'seed-2',
    title: 'Lorem Ipsum',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: 'in-progress',
    createdAt: 'Wed 31, July 2024',
  },
  {
    id: 'seed-3',
    title: 'Design review',
    description: 'Review the latest design mockups and provide feedback.',
    status: 'pending',
    createdAt: 'Thu 1, August 2024',
  },
  {
    id: 'seed-4',
    title: 'Update documentation',
    description: 'Update the README and API docs with new endpoints.',
    status: 'pending',
    createdAt: 'Thu 1, August 2024',
  },
  {
    id: 'seed-5',
    title: 'Write unit tests',
    description: 'Add unit tests for the new authentication module.',
    status: 'pending',
    createdAt: 'Fri 2, August 2024',
  },
  {
    id: 'seed-6',
    title: 'Deploy to staging',
    description: 'Deploy the latest build to the staging environment.',
    status: 'pending',
    createdAt: 'Fri 2, August 2024',
  },
  {
    id: 'seed-7',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment.',
    status: 'completed',
    createdAt: 'Mon 29, July 2024',
  },
  {
    id: 'seed-8',
    title: 'Initial project setup',
    description: 'Initialize the React project with TypeScript and Tailwind.',
    status: 'completed',
    createdAt: 'Mon 29, July 2024',
  },
  {
    id: 'seed-9',
    title: 'Database schema design',
    description: 'Define the database schema for tasks and users.',
    status: 'completed',
    createdAt: 'Tue 30, July 2024',
  },
  {
    id: 'seed-10',
    title: 'Auth module',
    description: 'Implement JWT-based authentication.',
    status: 'completed',
    createdAt: 'Tue 30, July 2024',
  },
  {
    id: 'seed-11',
    title: 'API integration',
    description: 'Integrate the backend REST API with the frontend.',
    status: 'completed',
    createdAt: 'Wed 31, July 2024',
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS);

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
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
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
          (q === '' ||
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q))
      );
    },
    [tasks]
  );

  return { tasks, addTask, updateTask, deleteTask, getTasksByStatus };
}
