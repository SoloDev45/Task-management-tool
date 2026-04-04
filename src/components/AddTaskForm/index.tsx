import { useState } from 'react';
import Header from '../Header';
import * as styles from './styles';

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
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <Header title="Add Task" onBack={onCancel} />
      </div>

      <div className={styles.body}>
        <div>
          <input
            type="text"
            placeholder="Enter the title"
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
            placeholder="Enter the description"
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

        <div className={styles.actions}>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          <button type="button" onClick={handleSubmit} className={styles.submitButton}>ADD</button>
        </div>
      </div>
    </div>
  );
}
