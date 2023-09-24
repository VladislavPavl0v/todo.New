/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';

function TasksFilter({ filter, onFilterChange }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];

  return (
    <ul className="filters">
      {buttons.map(({ name, label }) => {
        const isActive = filter === name;
        const clazz = isActive ? 'selected' : '';
        return (
          <li key={name}>
            <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
};

export default TasksFilter;
