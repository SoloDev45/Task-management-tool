import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App.tsx'
import TaskListPage from './pages/TaskListPage.tsx'
import AddTaskPage from './pages/AddTaskPage.tsx'
import EditTaskPage from './pages/EditTaskPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <TaskListPage /> },
      { path: 'add', element: <AddTaskPage /> },
      { path: 'edit/:id', element: <EditTaskPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
