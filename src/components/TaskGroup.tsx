import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { Task, TaskStatus } from '../types/task';
import { STATUS_LABELS } from '../types/task';
import TaskItem from './TaskItem';

interface TaskGroupProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  newTaskId?: string | null;
}

export default function TaskGroup({ status, tasks, onEdit, onDelete, newTaskId }: TaskGroupProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mb-2">
      {/* Group header */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-100 rounded-md hover:bg-gray-150 transition-colors"
        aria-expanded={!collapsed}
      >
        <span className="text-sm text-gray-600 font-medium">
          {STATUS_LABELS[status]}{' '}
          <span className="text-gray-400">({tasks.length})</span>
        </span>
        {collapsed ? (
          <ChevronDown size={16} className="text-gray-500" />
        ) : (
          <ChevronUp size={16} className="text-gray-500" />
        )}
      </button>

      {/* Task list */}
      {!collapsed && tasks.length > 0 && (
        <div className="mt-2 animate-collapseDown">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              animateIn={task.id === newTaskId}
            />
          ))}
        </div>
      )}

      {!collapsed && tasks.length === 0 && (
        <p className="text-center text-gray-400 text-xs py-3 animate-collapseDown">
          No tasks here
        </p>
      )}
    </div>
  );
}
