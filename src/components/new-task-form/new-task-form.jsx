/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    });
  };

  onSecondsChange = (e) => {
    this.setState({
      seconds: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { addItem } = this.props;
    const { label, minutes, seconds } = this.state;
    e.preventDefault();

    // Проверяем, что minutes и seconds числа перед передачей их в addItem
    if (!isNaN(minutes) && !isNaN(seconds)) {
      // eslint-disable-next-line radix
      addItem(label, parseInt(minutes), parseInt(seconds));
    }

    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          name="description"
          onChange={this.onLabelChange}
          // обновляем value
          value={this.state.label}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          name="minutes"
          value={this.state.minutes}
          onChange={this.onMinutesChange}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          name="seconds"
          value={this.state.seconds}
          onChange={this.onSecondsChange}
        />
        <input type="submit" className="new-todo-form__submit" />
      </form>
    );
  }
}
