import React from 'react';
import Task from '../task'
import PropTypes from "prop-types";

import './task-list.css'

const TaskList = ({ todoItem, onDeleted, onToggleDone, onChangeLabel }) => {


  return <ul className="todo-list">
    {todoItem.map(item => (
      <Task
        status={item.status}
        key={item.id}
        label={item.label}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        done={item.done}
        onChangeLabel={(label) => onChangeLabel(item.id, label)}
        created={item.created}
      />
    ))}

  </ul>;


}

TaskList.defaultProps = {
  todoItem: () => { },
  onDeleted: () => { },
  onToggleDone: () => { }
}

TaskList.propTypes = {
  todoItem: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired
    })
  ),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onChangeLabel: PropTypes.func
}

export default TaskList;