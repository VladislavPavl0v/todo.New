
import React from "react";
//import { formatDistanceToNow } from 'date-fns';

import './task.css'


const Task = (props) => {

    return (
        <ul>
            <li className="completed">
                <div className="view">
                    <input className="toggle" type="checkbox" />
                    <label>
                        <span className="description">Completed task</span>
                        <span className="created">created 17 seconds ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
            </li>
            <li className="editing">
                <div className="view">
                    <input className="toggle" type="checkbox" />
                    <label>
                        <span className="description">Editing task</span>
                        <span className="created">created 5 minutes ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
                <input type="text" className="edit" defaultValue="Editing task" />
            </li>
            <li>
                <div className="view">
                    <input className="toggle" type="checkbox" />
                    <label>
                        <span className="description">Active task</span>
                        <span className="created">created 5 minutes ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
            </li>
        </ul>
    );
}

export default Task;

