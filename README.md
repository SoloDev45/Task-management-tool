# Task Management Tool

A simple task management app built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Vite

## How to Use

**Add a Task**
Click the + button at the bottom, enter a title and description, then click ADD.

**Edit a Task**
Hover over any task to reveal the edit icon, click it to update the title, description, or status.

**Delete a Task**
Hover over any task and click the trash icon to remove it.

**Change Task Status**
While editing a task, use the status dropdown to switch between Pending, In Progress, and Completed.

**Search Tasks**
Use the search bar at the top to filter tasks by title or description.

**Tasks are grouped by status** — In Progress, Pending, and Completed — and each group can be collapsed or expanded.

Tasks are saved in the browser's local storage, so they persist across page reloads.

## Run Locally

1. Clone the repo

```bash
git clone https://github.com/SoloDev45/Task-management-tool.git
```

2. Navigate into the folder

```bash
cd Task-management-tool
```

3. Install dependencies

```bash
npm install
```

4. Start the dev server

```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`
