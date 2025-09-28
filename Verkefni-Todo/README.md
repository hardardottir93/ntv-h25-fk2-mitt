# Todo List Command Line Application

A simple command-line todo list application built with Node.js that allows you to manage tasks from the terminal.

## Features

- ✅ Add new tasks
- 📋 List all tasks with completion status
- ✔️ Mark tasks as completed
- 🗑️ Clear all tasks
- 💾 Persistent storage using JSON file
- 🎨 Colorful terminal output with Chalk

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd lesson3/verkefni
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## How to Run

### Using npm script:
```bash
npm start <command> [arguments]
```

### Using Node directly:
```bash
node app.js <command> [arguments]
```

## Available Commands

### Add a new task
```bash
npm start add "Your task description"
# or
node app.js add "Your task description"
```
Example:
```bash
npm start add "Complete homework assignment"
```

### List all tasks
```bash
npm start list
# or
node app.js list
```

### Mark a task as done
```bash
npm start done <task_number>
# or
node app.js done <task_number>
```
Example:
```bash
npm start done 1
```

### Clear all tasks
```bash
npm start clear
# or
node app.js clear
```

### Show help
```bash
npm start
# or
node app.js
```

## Example Usage

```bash
# Add some tasks
npm start add "Study for exam"
npm start add "Buy groceries"
npm start add "Call mom"

# List tasks to see them
npm start list

# Mark the first task as done
npm start done 1

# List tasks again to see the update
npm start list

# Clear all tasks when done
npm start clear
```

## File Structure

```
verkefni/
├── app.js          # Main application entry point
├── tasks.js        # Task management functions
├── tasks.json      # Persistent storage for tasks (auto-generated)
├── package.json    # Project dependencies and scripts
└── README.md       # This file
```

## Code Overview

### `app.js`
- Main entry point that handles command-line arguments
- Uses a switch statement to route commands
- Provides user-friendly error messages and help text

### `tasks.js`
- Contains all task management functions:
  - `addTask(task)` - Adds a new task
  - `listTasks()` - Displays all tasks with status
  - `markTaskDone(index)` - Marks a task as completed
  - `clearTasks()` - Removes all tasks
  - `loadTasks()` - Reads tasks from JSON file
  - `saveTasks(tasks)` - Writes tasks to JSON file

### `tasks.json`
- JSON file that stores all tasks persistently
- Automatically created when first task is added
- Each task has a `task` description and `done` boolean status

## Dependencies

- **chalk** (^5.6.2): Provides colorful terminal output
  - Green: Success messages and completed tasks
  - Red: Error messages and pending tasks
  - Blue: Headers and information
  - Yellow: Warnings and help text
  - Cyan: Command examples

## Task Data Structure

Each task is stored as an object with the following structure:
```javascript
{
  task: "Task description",
  done: false
}
```

## Error Handling

The application includes proper error handling for:
- Missing task descriptions when adding
- Invalid task numbers when marking done
- File read/write errors (gracefully defaults to empty task list)
- Invalid command usage

## Tips for Students

1. **Start by exploring the code:** Read through `app.js` and `tasks.js` to understand the application structure
2. **Test all commands:** Try adding, listing, completing, and clearing tasks to see how the application works
3. **Examine the JSON file:** After adding tasks, check the `tasks.json` file to see how data is stored
4. **Experiment with edge cases:** Try invalid commands, missing arguments, etc. to see error handling
5. **Understand the module system:** Notice how functions are exported from `tasks.js` and imported in `app.js`

## Possible Enhancements (Ideas for Further Development)

- Add task editing functionality
- Implement task priorities
- Add due dates for tasks
- Create task categories or tags
- Add task search functionality
- Implement task archiving instead of deletion
- Add task statistics (completed vs pending)

## Troubleshooting

**Command not working?**
- Make sure you're in the correct directory (`lesson3/verkefni`)
- Ensure dependencies are installed (`npm install`)
- Check that Node.js is installed (`node --version`)

**Tasks not persisting?**
- Check if `tasks.json` file exists and has write permissions
- Ensure the application has permission to create files in the directory

**Colors not showing?**
- Your terminal may not support colors, but the application will still function
