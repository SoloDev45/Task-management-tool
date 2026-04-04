import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../Header';
import * as styles from './styles';

interface AddTaskFormProps {
  onAdd: (title: string, description: string) => void;
  onCancel: () => void;
}

export default function AddTaskForm({ onAdd, onCancel }: AddTaskFormProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!title.trim()) errs.title = t('addForm.titleRequired');
    if (!description.trim()) errs.description = t('addForm.descriptionRequired');
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
        <Header title={t('header.addTask')} onBack={onCancel} />
      </div>

      <div className={styles.body}>
        <div>
          <input
            type="text"
            placeholder={t('addForm.titlePlaceholder')}
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
            placeholder={t('addForm.descriptionPlaceholder')}
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
          <button type="button" onClick={onCancel} className={styles.cancelButton}>{t('addForm.cancel')}</button>
          <button type="button" onClick={handleSubmit} className={styles.submitButton}>{t('addForm.add')}</button>
        </div>
      </div>
    </div>
  );
}
