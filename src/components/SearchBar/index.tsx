import { Search, X } from 'lucide-react';
import * as styles from './styles';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
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
  );
}
