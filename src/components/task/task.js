
import React, { Component } from "react";
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import './task.css'

export default class Task extends Component {
    //чтобы не использовать Bind создаем супер конструктор с обработчиком событий
    state = {
        done: true//state для обработчика событий
    }; 


    onLabelClick = () => {
        this.setState(({done})=>{
            return{
            done: !done     //функия обработки собитий, при повторном нажатии возвращает исходное значение
            };
        });
    };


    render() {
        const { label, /*created,*/ status, /*important*/ onDeleted} = this.props; //при классах пропсы добавляються таким образом
        const { done } = this.state;  //добавляем state для done
        let className = `${status}`;
        if (done) {
            className +=  "completed";//добавляет стиль комплит
        }
        return (
            <li className={className}>
                <div className="view">
                    <input className="toggle" type="checkbox" />
                    <label onClick={this.onLabelClick}> {/*Можно использоапть bind, что бы намертво привязать this*/}
                        <span className="description">{label}</span>
                        <span className="created"></span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy" onClick={onDeleted}></button>
                </div>
                {status === "editing" ? (
                    <input type="text" className="edit" defaultValue={label} />
                ) : null}
            </li>
        );
    }
}


