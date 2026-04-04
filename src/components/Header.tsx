import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: HeaderProps) {
  return (
    <div className="flex items-center gap-3 bg-primary px-4 py-4">
      {onBack && (
        <button
          onClick={onBack}
          className="text-white hover:opacity-80 transition-opacity p-0.5 rounded"
          aria-label="Go back"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </button>
      )}
      <h1 className="text-white font-semibold text-base tracking-wide uppercase">
        {title}
      </h1>
    </div>
  );
}
