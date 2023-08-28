import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.trim() !== '') {
      this.props.addItem(this.state.label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          // обновляем value
          value={this.state.label}
        />
      </form>
    );
  }
}
