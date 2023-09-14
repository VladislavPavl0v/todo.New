/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Timer from '../timer';

export default class Task extends Component {
  static defaultProps = {
    label: 'Default Label',
    onDeleted: () => {},
    onToggleDone: () => {},
    done: false,
    onChangeLabel: () => {},
    created: new Date(),
    onStartTimer: () => {},
    onStopTimer: () => {},
    minutes: 'Default minutes',
    seconds: 'Default seconds',
  };

  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    done: PropTypes.bool,
    onChangeLabel: PropTypes.func,
    created: PropTypes.instanceOf(Date),
    onStartTimer: PropTypes.func,
    onStopTimer: PropTypes.func,
    minutes: PropTypes.string,
    seconds: PropTypes.string,
  };

  state = {
    edited: false,
    newLabel: this.props.label,
    createdFormat: formatDistanceToNow(this.props.created, { includeSeconds: true }),
  };

  componentDidMount() {
    this.timerID = setInterval(this.updateTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTimer = () => {
    this.setState({
      createdFormat: formatDistanceToNow(this.props.created, { includeSeconds: true }),
    });
  };

  changeLabel = (e) => {
    if (e.key === 'Enter') {
      this.props.onChangeLabel(e.target.value);
      this.setState({ edited: false });
    }
  };

  enableEdit = () => {
    this.setState({ edited: true });
  };

  // переключаем чек бокс
  CheckboxChange = () => {
    this.props.onToggleDone();
  };

  render() {
    const { label, onDeleted, done, onStartTimer, onStopTimer, minutes, seconds } = this.props;
    const { edited, newLabel, createdFormat } = this.state;
    let classNames = '';
    classNames += done ? ' completed' : '';
    classNames += edited ? ' editing' : '';
    return (
      <li className={`${classNames}`}>
        <div className="view">
          <input className="toggle" checked={done} type="checkbox" onChange={this.CheckboxChange} />
          <label>
            <span className="title">{label}</span>
            <Timer
              onStartTimer={onStartTimer}
              onStopTimer={onStopTimer}
              minutes={minutes}
              seconds={seconds}
            />
            <span className="description">{`created ${createdFormat} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.enableEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input
          type="text"
          className="edit"
          value={newLabel}
          onInput={(e) => {
            this.setState({ newLabel: e.target.value });
          }}
          onKeyDown={this.changeLabel}
        />
      </li>
    );
  }
}
