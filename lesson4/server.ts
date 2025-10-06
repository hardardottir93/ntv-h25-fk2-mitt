import express from 'express'
import { addTask, loadTasks } from './tasks.js';

const app = express();
const port =3009;

app.use(express.json());


app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get('/tasks', (req, res) => {
    const tasks = loadTasks();
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { task } = req.body as {task: string}
    addTask(task);

    res.send("Ekkert mál");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


