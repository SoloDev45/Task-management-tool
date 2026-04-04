import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { Task, TaskStatus } from '../../types/task';
import { STATUS_LABELS } from '../../types/task';
import TaskItem from '../TaskItem';
import * as styles from './styles';

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
    <div className={styles.wrapper}>
      <button
        onClick={() => setCollapsed((c) => !c)}
        className={styles.groupHeader}
        aria-expanded={!collapsed}
      >
        <span className={styles.groupLabel}>
          {STATUS_LABELS[status]}{' '}
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
        <p className={styles.emptyText}>No tasks here</p>
      )}
    </div>
  );
}
