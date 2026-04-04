import { ArrowLeft } from 'lucide-react';
import * as styles from './styles';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: HeaderProps) {
  return (
    <div className={styles.wrapper}>
      {onBack && (
        <button onClick={onBack} className={styles.backButton} aria-label="Go back">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
