import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTaskForm from '../components/AddTaskForm';
import { useTasksContext } from '../hooks/useTasksContext';

export default function AddTaskPage() {
  const navigate = useNavigate();
  const { addTask } = useTasksContext();

  const handleAdd = useCallback(
    (title: string, description: string) => {
      const id = addTask(title, description);
      navigate('/', { state: { newTaskId: id } });
    },
    [addTask, navigate]
  );

  return <AddTaskForm onAdd={handleAdd} onCancel={() => navigate('/')} />;
}
