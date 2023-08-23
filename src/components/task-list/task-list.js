import React from 'react';
import Task from '../task'

import './task-list.css'

const TaskList = ({ todoItem, onDeleted, onToggleDone }) => { //добавил функцию onDeleted для удаления 



  return <ul className="todo-list">
    {todoItem.map(item => (
      <Task
        status={item.status}
        key={item.id}
        label={item.label}
        created={item.created}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        done={item.done}
      />
    ))}

  </ul>;


}

export default TaskList;