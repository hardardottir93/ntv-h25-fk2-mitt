import fs from 'node:fs';
import chalk from 'chalk';
import { randomUUID } from 'node:crypto';

const filePath = './tasks.json';

function createID() {
  return randomUUID();
}

type Task = {
  id: string;
  task: string;
  done: boolean;
}

// Load tasks from file tasks.json
export function loadTasks(): Task[] {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save tasks to file tasks.json
function saveTasks(tasks: Task[]) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Add a new task to the file tasks.json
export function addTask(task: string) {
  const tasks = loadTasks();
  tasks.push({ task, done: false, id: createID() });
  saveTasks(tasks);
  console.log(chalk.green(`Added task: "${task}"`));
}

// List all tasks from the file tasks.json
export function listTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow('No tasks found. Add a task to get started!'));
    return;
  }
  console.log(chalk.blue('Your Tasks:'));
  tasks.forEach((t, i) => {
    const status = t.done ? chalk.green('[✔]') : chalk.red('[ ]');
    console.log(`${i + 1}. ${status} ${t.task} (${t.id})`);
  });
}

// Mark a task as done in the file tasks.json
export function markTaskDone(id: string) {
  const tasks = loadTasks();

  const task = tasks.find((task) => {
    return task.id === id;
  });

  if(!task) {
    return false;
  }

  task.done = true;
  saveTasks(tasks);

  return true;
}

// Clear all tasks from the file tasks.json
export function clearTasks() {
  saveTasks([]);
  console.log(chalk.green('All tasks cleared!'));
}
