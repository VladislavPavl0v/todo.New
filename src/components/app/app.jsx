/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unused-state */
/* eslint-disable indent */
import React, { Component } from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer';
import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoItem: [],
    term: '',
    filter: 'all',
    created: new Date(),
  };

  createTodoItem = (label) => ({
    label,
    done: false,
    id: this.maxId++,
    status: '',
  });

  // добавлепие элемента
  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    newItem.created = new Date();
    this.setState(({ todoItem }) => {
      const newArr = [...todoItem, newItem];
      return {
        todoItem: newArr,
      };
    });
  };

  // удалерие элемента
  deleteItem = (id) => {
    this.setState(({ todoItem }) => {
      const idx = todoItem.findIndex((el) => el.id === id);
      const newArray = [...todoItem.slice(0, idx), ...todoItem.slice(idx + 1)];
      return {
        todoItem: newArray,
      };
    });
  };

  // функция переключения свойсва
  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  // пробрасыввем done вниз
  onToggleDone = (id) => {
    this.setState(({ todoItem }) => ({
      todoItem: this.toggleProperty(todoItem, id, 'done'),
    }));
  };

  // функция фильтрации элементов
  filter = (items, filter) => {
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
  };

  // обновление состояния филтра
  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  // поиск элементов
  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => item.label.indexOf(term) > -1);
  };

  // удаление всех выполеных
  onClearCompleted = () => {
    this.setState(({ todoItem }) => {
      const updateTodoItem = todoItem.filter((item) => !item.done);
      return {
        todoItem: updateTodoItem,
      };
    });
  };

  // Функция для редактирования задачи
  editItem = (id, editedLabel) => {
    this.setState(({ todoItem }) => {
      const idx = todoItem.findIndex((el) => el.id === id);
      const updatedTodoItem = [...todoItem];
      updatedTodoItem[idx].label = editedLabel;
      return {
        todoItem: updatedTodoItem,
      };
    });
  };

  // функция редактирования текста
  onChangeLabel = (id, newLabel) => {
    this.setState(({ todoItem }) => {
      const index = todoItem.findIndex((el) => el.id === id);
      const updatedItem = { ...todoItem[index], label: newLabel };
      return {
        todoItem: [...todoItem.slice(0, index), updatedItem, ...todoItem.slice(index + 1)],
      };
    });
  };

  render() {
    const { todoItem, filter, term } = this.state;
    const vusableItems = this.filter(this.search(todoItem, term), filter);

    const doneCount = todoItem.filter((el) => el.done).length;
    const todoCount = todoItem.length - doneCount;

    return (
      <section className="todoapp">
        <header className="header">
          Todo
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todoItem={vusableItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onChangeLabel={this.onChangeLabel}
            created={this.created}
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
