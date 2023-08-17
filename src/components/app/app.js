import React from "react";
import NewTaskForm from '../new-task-form';
import TaskList from "../task-list/task-list";
import Footer from "../footer";

import './app.css';
const App = () => {
    const todoData = [
        { status: "completed", description: "Completed task", important: true, created: new Date(), id: 1 },
        { status: "editing", description: "Editing task", important: true, created: new Date(), id: 2 },
        { status: "", description: 'Active task', important: false, created: new Date(), id: 3 }
    ]

    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm />
            </header>
            <section className="main">
                <TaskList todos={todoData} />
                <Footer />
            </section>
        </section>

    );
}
export default App;