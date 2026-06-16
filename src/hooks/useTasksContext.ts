import { useOutletContext } from 'react-router-dom';
import type { useTasks } from './useTasks';

type TasksContextValue = ReturnType<typeof useTasks>;

/** Access the shared task state provided by the root layout's Outlet context. */
export function useTasksContext() {
  return useOutletContext<TasksContextValue>();
}
