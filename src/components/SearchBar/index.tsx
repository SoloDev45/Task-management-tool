import { useState, useRef, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { TaskStatus } from '../../types/task';
import { STATUS_LABELS, STATUS_COLORS, ALL_STATUSES } from '../../types/task';
import * as styles from './styles';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  filterStatus: TaskStatus | null;
  onFilterChange: (status: TaskStatus | null) => void;
}

export default function SearchBar({ value, onChange, filterStatus, onFilterChange }: SearchBarProps) {
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

  return (
    <div className={styles.wrapper}>
      {/* Search input */}
      <div className={styles.inputWrapper}>
        <Search size={15} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search To-Do"
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

      {/* Filter button */}
      <div className="relative" ref={filterRef}>
        <button
          onClick={() => setFilterOpen((o) => !o)}
          className={`${styles.filterButton} ${filterStatus ? styles.filterActive : ''}`}
          aria-label="Filter tasks"
        >
          <SlidersHorizontal size={16} />
          {filterStatus && <span className={styles.filterDot} />}
        </button>

        {/* Dropdown */}
        {filterOpen && (
          <div className={styles.dropdown}>
            {/* All option */}
            <button
              onClick={() => handleSelect(null)}
              className={`${styles.dropdownOption} ${filterStatus === null ? styles.dropdownOptionActive : ''}`}
            >
              <span className={styles.optionDot} style={{ backgroundColor: '#9ca3af' }} />
              All
            </button>

            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => handleSelect(s)}
                className={`${styles.dropdownOption} ${filterStatus === s ? styles.dropdownOptionActive : ''}`}
              >
                <span className={styles.optionDot} style={{ backgroundColor: STATUS_COLORS[s] }} />
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
