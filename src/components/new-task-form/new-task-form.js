import React, { Component } from 'react';

import './new-task-form.css'


export default class NewTaskForm extends Component {
  state = {
    label: ""
  };
  onLabelChange = (e) => {
    this.setState({
      //с помощью e.target.value достаем текуущее значение
      label: e.target.value
    })
  };
  onSubmit = (e) => {
    //когда браузер обновляеться не нужно выпонять действие по умочанию
    e.preventDefault();
    this.props.addItem(this.state.label)
    //добавляем пустую строчку
    this.setState({
   label:''
    });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" className="new-todo" placeholder="What needs to be done?" autoFocus
          onChange={this.onLabelChange}
        //обновляем value
          value={this.state.label}
        />
      </form>
    )
  }
};


