import { Navigate, useNavigate, useParams } from 'react-router-dom';
import EditTaskForm from '../components/EditTaskForm';
import { useTasksContext } from '../hooks/useTasksContext';

export default function EditTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tasks, updateTask } = useTasksContext();

  const task = tasks.find((t) => t.id === id);

  // Deep-linked or stale id with no matching task: send the user home.
  if (!task) return <Navigate to="/" replace />;

  return <EditTaskForm task={task} onUpdate={updateTask} onCancel={() => navigate('/')} />;
}
