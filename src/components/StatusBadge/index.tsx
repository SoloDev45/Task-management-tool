import type { TaskStatus } from '../../types/task';
import { STATUS_LABELS, STATUS_COLORS } from '../../types/task';
import * as styles from './styles';

interface StatusBadgeProps {
  status: TaskStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color = STATUS_COLORS[status];
  return (
    <span className={styles.wrapper} style={{ color }}>
      <span className={styles.dot} style={{ backgroundColor: color }} />
      {STATUS_LABELS[status]}
    </span>
  );
}
