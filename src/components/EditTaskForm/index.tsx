import { useState } from 'react';
import type { Task, TaskStatus } from '../../types/task';
import Header from '../Header';
import StatusDropdown from '../StatusDropdown';
import * as styles from './styles';

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
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <Header title="Edit Task" onBack={onCancel} />
      </div>

      <div className={styles.body}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            className={`${styles.inputBase} ${errors.title ? styles.inputError : styles.inputNormal}`}
          />
          {errors.title && <p className={styles.errorText}>{errors.title}</p>}
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors((prev) => ({ ...prev, description: undefined }));
            }}
            rows={4}
            className={`${styles.textarea} ${errors.description ? styles.inputError : styles.inputNormal}`}
          />
          {errors.description && <p className={styles.errorText}>{errors.description}</p>}
        </div>

        <StatusDropdown value={status} onChange={setStatus} />

        <div className={styles.actions}>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          <button type="button" onClick={handleUpdate} className={styles.submitButton}>Update</button>
        </div>
      </div>
    </div>
  );
}
