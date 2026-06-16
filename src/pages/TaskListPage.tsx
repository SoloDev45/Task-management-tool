import { useCallback, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Task, TaskStatus } from '../types/task';
import { ALL_STATUSES } from '../types/task';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TaskGroup from '../components/TaskGroup';
import { useTasksContext } from '../hooks/useTasksContext';
import * as styles from '../styles';

export default function TaskListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { getTasksByStatus, deleteTask } = useTasksContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | null>(null);

  // A freshly added task id is passed through navigation state so it can be
  // briefly highlighted, mirroring the previous in-app behaviour.
  const [newTaskId, setNewTaskId] = useState<string | null>(
    (location.state as { newTaskId?: string } | null)?.newTaskId ?? null
  );

  useEffect(() => {
    if (!newTaskId) return;
    const timer = setTimeout(() => setNewTaskId(null), 600);
    return () => clearTimeout(timer);
  }, [newTaskId]);

  const handleEdit = useCallback(
    (task: Task) => {
      navigate(`/edit/${task.id}`);
    },
    [navigate]
  );

  return (
    <>
      <div className={styles.headerWrapper}>
        <Header title={t('app.title')} />
      </div>

      <div className={styles.scrollableContent}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
        {ALL_STATUSES.filter((s) => filterStatus === null || s === filterStatus).map((status) => (
          <TaskGroup
            key={status}
            status={status}
            tasks={getTasksByStatus(status, searchQuery)}
            onEdit={handleEdit}
            onDelete={deleteTask}
            newTaskId={newTaskId}
          />
        ))}
      </div>

      <button
        onClick={() => navigate('/add')}
        className={styles.fabButton}
        aria-label="Add new task"
      >
        <Plus size={22} strokeWidth={2.5} />
      </button>
    </>
  );
}
