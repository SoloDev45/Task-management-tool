import { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TaskStatus } from '../../types/task';
import { STATUS_COLORS, ALL_STATUSES } from '../../types/task';
import * as styles from './styles';

interface StatusDropdownProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
}

const statusKeys: Record<TaskStatus, string> = {
  pending: 'status.pending',
  'in-progress': 'status.inProgress',
  completed: 'status.completed',
};

export default function StatusDropdown({ value, onChange }: StatusDropdownProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)} className={styles.trigger}>
        <span className={styles.triggerInner}>
          <span className={styles.triggerDot} style={{ backgroundColor: STATUS_COLORS[value] }} />
          <span className={styles.triggerLabel}>{t(statusKeys[value])}</span>
        </span>
        {open ? (
          <ChevronUp size={16} className={styles.chevron} />
        ) : (
          <ChevronDown size={16} className={styles.chevron} />
        )}
      </button>

      {open && (
        <div className={styles.dropdown}>
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
              className={`${styles.optionBase} ${s === value ? styles.optionActive : ''}`}
            >
              <span className={styles.optionDot} style={{ backgroundColor: STATUS_COLORS[s] }} />
              <span className={styles.optionLabel}>{t(statusKeys[s])}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
