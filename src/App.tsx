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

  if (view === 'add') {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-xl">
        <AddTaskForm
          onAdd={handleAdd}
          onCancel={() => setView('list')}
        />
      </div>
    );
  }

  if (view === 'edit' && editingTask) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-xl">
        <EditTaskForm
          task={editingTask}
          onUpdate={handleUpdate}
          onCancel={() => {
            setEditingTask(null);
            setView('list');
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <Header title="To-Do App" />

      {/* Search */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Task groups */}
      <div className="px-4 pb-24 space-y-2">
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

      {/* FAB */}
      <div className="sticky bottom-0 flex justify-center pb-6 pt-2 bg-gradient-to-t from-white to-transparent pointer-events-none">
        <button
          onClick={() => setView('add')}
          className="pointer-events-auto w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Add new task"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
