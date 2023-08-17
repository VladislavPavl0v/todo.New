import React from 'react';
import Task from '../task'

import './task-list.css'

const TaskList = (props) => {
  const todos = props.todos;


  return <ul className="todo-list">
    {todos.map(item => (
      <Task
        status={item.status}
        key={item.id}
        description={item.description}
        created={item.created}
        important={item.important}
      />
    ))}

  </ul>;


}

export default TaskList;