import { Outlet } from 'react-router-dom';
import { useTasks } from './hooks/useTasks';
import * as styles from './styles';

/**
 * Root layout: owns the task state once and shares it with every route via the
 * router Outlet context. Keeping a single `useTasks()` instance here means all
 * pages read and write the same localStorage-backed state.
 */
export default function App() {
  const tasks = useTasks();

  return (
    <div className={styles.appContainer}>
      <Outlet context={tasks} />
    </div>
  );
}
