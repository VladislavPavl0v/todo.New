import React, { Component } from "react";

import NewTaskForm from '../new-task-form';
import TaskList from "../task-list/task-list";
import Footer from "../footer";

import './app.css';
export default class App extends Component {          //Что бы можно было удалить компонет, App надо сделать компонентом класслом, 
    maxId = 100; //генерируем ID
    state = {                                   //а todoItem сделать частью state 
        todoItem: [
            { status: "completed", label: "Completed task", created: new Date(), id: 1 },
            { status: "editing", label: "Editing task", created: new Date(), id: 2 },
            { status: "completed", label: 'Active task', created: new Date(), id: 3 }
        ]
    };
    deleteItem = (id) => { //удалерие элемента
        this.setState(({ todoItem }) => {
            const idx = todoItem.findIndex((el) => el.id === id);
            const newArray = [...todoItem.slice(0, idx), ...todoItem.slice(idx + 1)];//нельзя изменять  существущий стейт(можно использовать метод toSpliced)
            return {
                todoItem: newArray     //возвращаем новое состояние
            };
        });
    };
    addItem = (text) => { //добавлепие элемента
        const newItem = {
            label: text,
            id: this.maxId++
        }
        this.setState(({ todoItem }) => {
            const newArr = [
                ...todoItem,
                newItem
            ];
            return {
                todoItem: newArr
            }
        });
    };

    render() {
        return (
            <section className="todoapp" >
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addItem={this.addItem} />
                </header>
                <section className="main">
                    <TaskList todoItem={this.state.todoItem}
                        onDeleted={this.deleteItem}
                    />
                    <Footer />
                </section>
            </section>

        );
    }

}
