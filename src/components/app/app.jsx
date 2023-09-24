/* eslint-disable react/no-unused-class-component-methods */
import React, { useState, useEffect } from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer';
import './app.css';

export default function App() {
  const [maxId, setMaxId] = useState(100);
  const [todoItem, setTodoItem] = useState([]);
  const term = '';
  const [filter, setFilter] = useState('all');
  const created = new Date();

  const createTodoItem = (label) => ({
    label,
    done: false,
    id: maxId + 1,
    status: '',
    timeStarted: false,
    minutes: '',
    seconds: '',
  });

  // добавление элемента
  const addItem = (text, minutes, seconds) => {
    const newItem = createTodoItem(text);
    newItem.minutes = minutes;
    newItem.seconds = seconds;
    newItem.created = new Date();
    setTodoItem([...todoItem, newItem]);
    setMaxId(maxId + 1);
  };

  // удаление элемента
  const deleteItem = (id) => {
    setTodoItem(todoItem.filter((el) => el.id !== id));
  };

  // функция переключения свойства
  const toggleProperty = (arr, id, propName) =>
    arr.map((item) => (item.id === id ? { ...item, [propName]: !item[propName] } : item));

  // пробрасываем done вниз
  const onToggleDone = (id) => {
    setTodoItem(toggleProperty(todoItem, id, 'done'));
  };

  // функция фильтрации элементов
  const filterItems = (items, newFilter) => {
    switch (newFilter) {
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

  // обновление состояния фильтра
  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // поиск элементов
  const search = (items, searchTerm) => {
    if (searchTerm.length === 0) {
      return items;
    }
    return items.filter((item) => item.label.indexOf(searchTerm) > -1);
  };

  // удаление всех выполненных
  const onClearCompleted = () => {
    setTodoItem(todoItem.filter((item) => !item.done));
  };

  // функция редактирования текста
  const onChangeLabel = (id, newLabel) => {
    setTodoItem((prevTodoItem) => {
      const index = prevTodoItem.findIndex((el) => el.id === id);
      const updatedItem = { ...prevTodoItem[index], label: newLabel };
      return [...prevTodoItem.slice(0, index), updatedItem, ...prevTodoItem.slice(index + 1)];
    });
  };
  const updateTime = (id) => {
    setTodoItem((prevTodoItem) => {
      const idx = prevTodoItem.findIndex((el) => el.id === id);
      if (idx === -1) {
        return prevTodoItem;
      }

      const updatedTodoItem = [...prevTodoItem];
      const item = updatedTodoItem[idx];

      if (item && item.timeStarted) {
        if (item.seconds > 0) {
          item.seconds -= 1;
        } else if (item.minutes > 0) {
          item.minutes -= 1;
          item.seconds = 59;
        }

        if (item.minutes === 0 && item.seconds === 0) {
          item.timeStarted = false;
        }
      }

      return updatedTodoItem;
    });
  };
  const startTimer = (id) => {
    const prevTimerId = todoItem.find((item) => item.id === id).timerId;
    if (prevTimerId) {
      clearInterval(prevTimerId);
    }

    setTodoItem((prevTodoItem) => {
      const idx = prevTodoItem.findIndex((el) => el.id === id);
      const updatedTodoItem = [...prevTodoItem];
      updatedTodoItem[idx].timeStarted = true;

      const timerId = setInterval(() => {
        updateTime(id);
      }, 1000);

      updatedTodoItem[idx].timerId = timerId;
      return updatedTodoItem;
    });
  };

  const stopTimer = (id) => {
    clearInterval(todoItem.find((item) => item.id === id).timerId);

    setTodoItem((prevTodoItem) => {
      const idx = prevTodoItem.findIndex((el) => el.id === id);
      const updatedTodoItem = [...prevTodoItem];
      updatedTodoItem[idx].timeStarted = false;
      return updatedTodoItem;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      todoItem.forEach((item) => {
        if (item.timeStarted) {
          updateTime(item.id);
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [todoItem]);

  const visibleItems = filterItems(search(todoItem, term), filter);

  const doneCount = todoItem.filter((el) => el.done).length;
  const todoCount = todoItem.length - doneCount;

  return (
    <section className="todoapp">
      <header className="header">
        Todo
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>

      <section className="main">
        <TaskList
          todoItem={visibleItems}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onChangeLabel={onChangeLabel}
          created={created}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
        <Footer
          filter={filter}
          todoCount={todoCount}
          onFilterChange={onFilterChange}
          onClearCompleted={onClearCompleted}
        />
      </section>
    </section>
  );
}
