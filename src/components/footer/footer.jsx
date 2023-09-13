/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../task-filter';

function Footer({ todoCount, filter, onFilterChange, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {todoCount}
        items left
      </span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
Footer.defaultProps = {
  todoCount: 0,
  filter: 'all',
  onFilterChange: () => {},
  onClearCompleted: () => {},
};

Footer.propTypes = {
  todoCount: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  onClearCompleted: PropTypes.func,
};

export default Footer;
