import type { TaskStatus } from '../types/task';
import { STATUS_LABELS, STATUS_COLORS } from '../types/task';

interface StatusBadgeProps {
  status: TaskStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color = STATUS_COLORS[status];
  return (
    <span className="flex items-center gap-1 text-xs font-medium whitespace-nowrap" style={{ color }}>
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {STATUS_LABELS[status]}
    </span>
  );
}
