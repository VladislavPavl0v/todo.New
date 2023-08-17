
import React from "react";
//import { formatDistanceToNow } from 'date-fns';

import './task.css'


const Task = (props) => {
    const { description, /*created,*/ status, important } = props;
    //const className = `${status}${important ? ' important' : ''}`;
    let className = `${status}`;
    if (!important) {
        className += "important";
    }
    return (

        <li className={className}>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description">{description}</span>
                    <span className="created"></span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
            {status === "editing" ? (
                <input type="text" className="edit" defaultValue={description} />
            ) : null}

        </li>


    );
}

export default Task;

