import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Task, TaskStatus } from '../../types/task';
import TaskItem from '../TaskItem';
import * as styles from './styles';

interface TaskGroupProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  newTaskId?: string | null;
}

const statusKeys: Record<TaskStatus, string> = {
  'pending': 'status.pending',
  'in-progress': 'status.inProgress',
  'completed': 'status.completed',
};

export default function TaskGroup({ status, tasks, onEdit, onDelete, newTaskId }: TaskGroupProps) {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => setCollapsed((c) => !c)}
        className={styles.groupHeader}
        aria-expanded={!collapsed}
      >
        <span className={styles.groupLabel}>
          {t(statusKeys[status])}{' '}
          <span className={styles.groupCount}>({tasks.length})</span>
        </span>
        {collapsed
          ? <ChevronDown size={16} className={styles.chevron} />
          : <ChevronUp size={16} className={styles.chevron} />
        }
      </button>

      {!collapsed && tasks.length > 0 && (
        <div className={styles.taskList}>
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
        <p className={styles.emptyText}>{t('taskGroup.empty')}</p>
      )}
    </div>
  );
}
