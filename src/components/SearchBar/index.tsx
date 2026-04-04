import { useState, useRef, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TaskStatus } from '../../types/task';
import { STATUS_COLORS, ALL_STATUSES } from '../../types/task';
import * as styles from './styles';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  filterStatus: TaskStatus | null;
  onFilterChange: (status: TaskStatus | null) => void;
}

export default function SearchBar({ value, onChange, filterStatus, onFilterChange }: SearchBarProps) {
  const { t } = useTranslation();
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (status: TaskStatus | null) => {
    onFilterChange(status === filterStatus ? null : status);
    setFilterOpen(false);
  };

  const statusKeys: Record<TaskStatus, string> = {
    'pending': 'status.pending',
    'in-progress': 'status.inProgress',
    'completed': 'status.completed',
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <Search size={15} className={styles.searchIcon} />
        <input
          type="text"
          placeholder={t('search.placeholder')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
        />
        {value && (
          <button onClick={() => onChange('')} className={styles.clearButton}>
            <X size={14} />
          </button>
        )}
      </div>

      <div className="relative" ref={filterRef}>
        <button
          onClick={() => setFilterOpen((o) => !o)}
          className={`${styles.filterButton} ${filterStatus ? styles.filterActive : ''}`}
          aria-label="Filter tasks"
        >
          <SlidersHorizontal size={16} />
          {filterStatus && <span className={styles.filterDot} />}
        </button>

        {filterOpen && (
          <div className={styles.dropdown}>
            <button
              onClick={() => handleSelect(null)}
              className={`${styles.dropdownOption} ${filterStatus === null ? styles.dropdownOptionActive : ''}`}
            >
              <span className={styles.optionDot} style={{ backgroundColor: '#9ca3af' }} />
              {t('filter.all')}
            </button>
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => handleSelect(s)}
                className={`${styles.dropdownOption} ${filterStatus === s ? styles.dropdownOptionActive : ''}`}
              >
                <span className={styles.optionDot} style={{ backgroundColor: STATUS_COLORS[s] }} />
                {t(statusKeys[s])}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
