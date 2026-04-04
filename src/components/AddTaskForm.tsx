import { useState } from 'react';
import Header from './Header';

interface AddTaskFormProps {
  onAdd: (title: string, description: string) => void;
  onCancel: () => void;
}

export default function AddTaskForm({ onAdd, onCancel }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAdd(title, description);
  };

  return (
    <div className="animate-slideInPage">
      <Header title="Add Task" onBack={onCancel} />

      <div className="p-4 space-y-3 bg-white min-h-screen">
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
            }}
            className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-gray-700 placeholder-gray-400 ${
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
            placeholder="Enter the description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors((e) => ({ ...e, description: undefined }));
            }}
            rows={4}
            className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-gray-700 placeholder-gray-400 resize-none ${
              errors.description ? 'border-red-400' : 'border-gray-200'
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

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
            onClick={handleSubmit}
            className="flex-1 py-2.5 bg-primary text-white rounded-md text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
