import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Task } from '../../types/task';
import StatusBadge from '../StatusBadge';
import * as styles from './styles';

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

  const cardClass = [
    styles.card,
    animateIn ? styles.cardAnimateIn : '',
    isDeleting ? styles.cardDeleting : '',
  ].join(' ');

  return (
    <div className={cardClass}>
      <div className={styles.inner}>
        <div className={styles.avatar}>
          <span className={styles.avatarInitial}>{getInitial(task.title)}</span>
        </div>

        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <span className={styles.taskTitle}>{task.title}</span>
            <StatusBadge status={task.status} />
          </div>
          <p className={styles.description}>{task.description}</p>
          <p className={styles.date}>{task.createdAt}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={() => onEdit(task)} className={styles.editButton} aria-label="Edit task">
          <Pencil size={14} strokeWidth={2} />
        </button>
        <button onClick={handleDelete} className={styles.deleteButton} aria-label="Delete task">
          <Trash2 size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
