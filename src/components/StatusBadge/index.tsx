import { useTranslation } from 'react-i18next';
import type { TaskStatus } from '../../types/task';
import { STATUS_COLORS } from '../../types/task';
import * as styles from './styles';

interface StatusBadgeProps {
  status: TaskStatus;
}

const statusKeys: Record<TaskStatus, string> = {
  'pending': 'status.pending',
  'in-progress': 'status.inProgress',
  'completed': 'status.completed',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation();
  const color = STATUS_COLORS[status];
  return (
    <span className={styles.wrapper} style={{ color }}>
      <span className={styles.dot} style={{ backgroundColor: color }} />
      {t(statusKeys[status])}
    </span>
  );
}
