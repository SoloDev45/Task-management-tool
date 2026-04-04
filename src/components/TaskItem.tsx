import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Task } from '../types/task';
import StatusBadge from './StatusBadge';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  animateIn?: boolean;
}

function getInitial(title: string): string {
  return title.trim().charAt(0).toUpperCase() || '?';
}

export default function TaskItem({ task, onEdit, onDelete, animateIn }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 280);
  };

  return (
    <div
      className={`
        group relative bg-white border border-gray-100 rounded-lg px-3 py-3 mb-2 shadow-sm
        hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-default
        ${animateIn ? 'animate-slideInUp' : ''}
        ${isDeleting ? 'task-exit pointer-events-none' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-sm font-semibold">{getInitial(task.title)}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span className="text-primary font-semibold text-sm leading-tight">
              {task.title}
            </span>
            <StatusBadge status={task.status} />
          </div>
          <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">
            {task.description}
          </p>
          <p className="text-gray-400 text-xs mt-1.5">{task.createdAt}</p>
        </div>
      </div>

      {/* Hover actions */}
      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button
          onClick={() => onEdit(task)}
          className="p-1 text-gray-400 hover:text-primary transition-colors rounded"
          aria-label="Edit task"
        >
          <Pencil size={14} strokeWidth={2} />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded"
          aria-label="Delete task"
        >
          <Trash2 size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
