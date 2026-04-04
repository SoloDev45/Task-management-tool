import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as styles from './styles';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: HeaderProps) {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  return (
    <div className={styles.wrapper}>
      {onBack && (
        <button onClick={onBack} className={styles.backButton} aria-label="Go back">
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
      <button onClick={toggleLang} className={styles.langToggle}>
        {i18n.language === 'en' ? 'HI' : 'EN'}
      </button>
    </div>
  );
}
