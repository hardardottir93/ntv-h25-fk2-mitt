import fs from 'node:fs';
import chalk from 'chalk';
import { Console } from 'node:console';

const filePath = './tasks.json';

// Load tasks from the file tasks.json and return the list of tasks as an array
function loadTasks() {
  try {
    // TODO: Use fs functions to load tasks from file tasks.json

    const readFiles = fs.readFileSync(filePath, 'utf-8');
    const arr = JSON.parse(readFiles);

    return arr;

  } catch {
    return [];
  }
}

// Save tasks to the file tasks.json
function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks), 'utf-8');
}

// Add a new task to the file tasks.json
export function addTask(task) {

    // 1. Load task from the file task.json
    const allTasksArray = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // 2. Add the new task to the tasks array
    allTasksArray.push({task, done: false});

    // 3. Save the tasks to the file tasks.json
    saveTasks(allTasksArray);

    // 4. Print "Added task: "${task}" in green color
    console.log(chalk.green(`Added task: ${task}`));

}

// List all tasks from the file tasks.json and print them to the console
export function listTasks() {

  // 1. Load tasks from the file tasks.json
  const tasks = loadTasks();

  // 2. If there are no tasks, print "No tasks found. Add a task to get started!" in yellow color
  if (tasks.length === 0) {
    console.log(chalk.yellow('No task found. Add a task to get started!'));

  // 3. If there are tasks, print "Your Tasks:" in blue color
  } else {
    console.log(chalk.blue('Your Tasks:'));

  // 4. Print each task in the following format:
  //  - [✔] Task number and task description -  if the task is done
  //  - [ ] Task number and task description - if the task is not done
  //  - the task number and the task description
    tasks.map( (task,i) => {
      if (task.done)  console.log(`[✔] ${i+1}. ${task.task}`);
      else  console.log(`[ ] ${i+1}. ${task.task}`);
    });
  }
}

// Mark a task as done in the file tasks.json
export function markTaskDone(index) {
  // 1. Load tasks from the file tasks.json
  const tasks = loadTasks();

  // 2. If the task number is invalid, print "Error: Invalid task number." in red color
  if ( index < 1 || index > tasks.length || index===null ) {
    console.log (chalk.red('Error: Invalid task number.'));

  } else {
  // 3. If the task number is valid, mark the task as done and save the tasks to the file tasks.json
  tasks[index-1].done = true;
  saveTasks(tasks);
  
  // 4. Print "Marked task #${index} as done." in green color
  console.log(chalk.green(`Marked task #${index} as done.`));
  }
}

// Clear all tasks from the file tasks.json
export function clearTasks() {
  //  1. Clear all tasks from the file tasks.json
  fs.writeFileSync(filePath, JSON.stringify([], 'utf-8'));

  //  2. Print "All tasks cleared!" in green color
  console.log(chalk.green('All tasks cleared!'));
}
