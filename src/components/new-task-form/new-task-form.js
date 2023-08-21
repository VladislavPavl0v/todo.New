import React, { Component } from 'react';

import './new-task-form.css'


export default class NewTaskForm extends Component {
  /*const SearchText = 'Type here to search';
  const searchStyle = {
    fontSize: '20px'
  };*/
  render() {
    return (
      <input className="new-todo" placeholder="What needs to be done?" autoFocus 
        onClick={()=> this.props.addItem('Привет мир')}
      />
    )
  }
};


