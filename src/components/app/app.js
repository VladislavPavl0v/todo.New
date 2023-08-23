import React, { Component } from "react";

import NewTaskForm from '../new-task-form';
import TaskList from "../task-list/task-list";
import Footer from "../footer";

import './app.css';
export default class App extends Component {
    //присваиваем Id
    maxId = 100;
    state = {
        todoItem: [
            this.createTodoItem("Completed task"),
            this.createTodoItem("Editing task"),
            this.createTodoItem("completed"),
        ],
        term: '',
        filter: 'all' //active, all, done
    };
    createTodoItem(label) {
        return {
            label,
            done: false,
            id: this.maxId++,
            status: ""
        }
    }
    //удалерие элемента
    deleteItem = (id) => {
        this.setState(({ todoItem }) => {
            const idx = todoItem.findIndex((el) => el.id === id);
            const newArray = [
                ...todoItem.slice(0, idx),
                ...todoItem.slice(idx + 1)
            ];
            //возвращаем новое состояние                //нельзя изменять  существущий стейт(можно использовать метод toSpliced)
            return {
                todoItem: newArray
            };
        });
    };
    //добавлепие элемента
    addItem = (text) => {
        const newItem = this.createTodoItem(text);
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
    //функция переключения свойсва
    toggleProperty(arr, id, propName) {
        // Эта функция принимает массив (arr), id элемента и имя свойства (propName),
        // которое нужно переключить. Она будет возвращать новый массив с обновленным свойством.

        const idx = arr.findIndex((el) => el.id === id);
        // Мы ищем индекс элемента в массиве, который имеет заданный id.                                         

        const oldItem = arr[idx];
        // Здесь мы получаем сам объект (элемент) из массива по найденному индексу.

        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        // Мы создаем новый объект, который будет копией старого объекта (oldItem),
        // но с обновленным значением заданного свойства (propName).
        // Мы используем квадратные скобки и переменную propName для динамического
        // задания имени свойства.

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
        // Здесь мы создаем новый массив, объединяя:
        // - часть исходного массива до обновленного элемента,
        // - новый обновленный элемент,
        // - часть исходного массива после обновленного элемента.
        // Это создает новый массив, в котором элемент с заданным id имеет обновленное свойство.
    }
    //пробрасыввем done вниз
    onToggleDone = (id) => {
        this.setState(({ todoItem }) => {
            return {
                todoItem: this.toggleProperty(todoItem, id, 'done')
            };
        });
    };
    //функция фильтрации элементов
    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }
    //обновление состояния филтра
    onFilterChange = (filter) => {
        this.setState({ filter })
    }
    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    }
    //удаление всех выполеных
    onClearCompleted = () => {
        this.setState(({ todoItem }) => {
            const updateTodoItem = todoItem.filter(item => !item.done);
            return {
                todoItem: updateTodoItem
            }
        })
    };

    render() {
        const { todoItem, filter, term } = this.state;

        const vusableItems = this.filter(
            this.search(todoItem, term), filter);
        //количесво выполненых тасков
        const doneCount = todoItem
            .filter((el) => el.done).length;
        //количесво не выполненых тасков
        const todoCount = todoItem.length - doneCount;

        return (
            <section className="todoapp" >
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addItem={this.addItem} />
                </header>
                <section className="main">
                    <TaskList todoItem={vusableItems}
                        onDeleted={this.deleteItem}
                        onToggleDone={this.onToggleDone}
                    />
                    <Footer
                        filter={filter}
                        todoCount={todoCount}
                        onFilterChange={this.onFilterChange}
                        onClearCompleted={this.onClearCompleted}
                    />
                </section>
            </section>

        );
    }

}
