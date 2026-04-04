import { useState } from 'react';
import type { Task, TaskStatus } from '../types/task';
import Header from './Header';
import StatusDropdown from './StatusDropdown';

interface EditTaskFormProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => void;
  onCancel: () => void;
}

export default function EditTaskForm({ task, onUpdate, onCancel }: EditTaskFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdate = () => {
    if (!validate()) return;
    onUpdate(task.id, { title: title.trim(), description: description.trim(), status });
    onCancel();
  };

  return (
    <div className="animate-slideInPage flex flex-col h-full">
      <div className="flex-shrink-0">
        <Header title="Edit Task" onBack={onCancel} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
        {/* Title */}
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((er) => ({ ...er, title: undefined }));
            }}
            className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-gray-700 ${
              errors.title ? 'border-red-400' : 'border-gray-200'
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors((er) => ({ ...er, description: undefined }));
            }}
            rows={4}
            className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-gray-700 resize-none ${
              errors.description ? 'border-red-400' : 'border-gray-200'
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Status */}
        <StatusDropdown value={status} onChange={setStatus} />

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 border border-gray-300 rounded-md text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="flex-1 py-2.5 bg-primary text-white rounded-md text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
