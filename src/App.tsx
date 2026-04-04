import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import type { Task } from './types/task';
import { ALL_STATUSES } from './types/task';
import { useTasks } from './hooks/useTasks';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TaskGroup from './components/TaskGroup';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import * as styles from './styles';

type View = 'list' | 'add' | 'edit';

export default function App() {
  const { addTask, updateTask, deleteTask, getTasksByStatus } = useTasks();

  const [view, setView] = useState<View>('list');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTaskId, setNewTaskId] = useState<string | null>(null);

  const handleAdd = useCallback(
    (title: string, description: string) => {
      const id = addTask(title, description);
      setNewTaskId(id);
      setView('list');
      setTimeout(() => setNewTaskId(null), 600);
    },
    [addTask]
  );

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setView('edit');
  }, []);

  const handleUpdate = useCallback(
    (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => {
      updateTask(id, updates);
    },
    [updateTask]
  );

  const renderView = () => {
    switch (view) {
      case 'add':
        return (
          <AddTaskForm
            onAdd={handleAdd}
            onCancel={() => setView('list')}
          />
        );

      case 'edit':
        return editingTask ? (
          <EditTaskForm
            task={editingTask}
            onUpdate={handleUpdate}
            onCancel={() => {
              setEditingTask(null);
              setView('list');
            }}
          />
        ) : null;

      case 'list':
      default:
        return (
          <>
            <div className={styles.headerWrapper}>
              <Header title="To-Do App" />
            </div>

            <div className={styles.scrollableContent}>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              {ALL_STATUSES.map((status) => (
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
              onClick={() => setView('add')}
              className={styles.fabButton}
              aria-label="Add new task"
            >
              <Plus size={22} strokeWidth={2.5} />
            </button>
          </>
        );
    }
  };

  return (
    <div className={styles.appContainer}>
      {renderView()}
    </div>
  );
}
