import React from "react"
import TasksFilter from '../task-filter'


import './footer.css'
const Footer = ({ todoCount, filter, onFilterChange, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter
        filter={filter}
        onFilterChange={onFilterChange}
      />
      <button className="clear-completed"
        onClick={onClearCompleted}>
        Clear completed
        </button>
    </footer>
  )

}

export default Footer;