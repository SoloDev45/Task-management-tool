import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import './i18n'
import App from './App.tsx'
import TaskListPage from './pages/TaskListPage.tsx'
import AddTaskPage from './pages/AddTaskPage.tsx'
import EditTaskPage from './pages/EditTaskPage.tsx'

const router = createBrowserRouter([
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
