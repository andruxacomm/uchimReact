import React, {FC, memo, useEffect, useState} from "react";
import {ToDoProps} from "./todoTypes";
import {ToDoList, generateId} from "./ToDoList";

export const ToDoItem: FC<ToDoProps> = memo((props) => {
    const [title, setTitle] = useState(props.title);
    const [completed, setCompleted] = useState(props.completed);
    const [list, setList] = useState(props.list);
    const [isTitleEdit, setIsTitleEdit] = useState(true);

    useEffect((): void => {
        props.onUpdate({...props, list, title, completed});
    }, [completed, title, list]);

    const makeNestedList = () => {
        if (list.length === 0) {
            setList([...list, {title: title, completed: false, id: generateId(list), list: []}]);
        }
    };

    return (
        <li style={{listStyle: "none"}}>
            <div>
                {!isTitleEdit && <h3>{props.order + 1} Task of {props.listName} list is: {title}</h3>}

                {isTitleEdit && <input type="text" value={title} onChange={e => setTitle(e.currentTarget.value)}/>}

                <label>
                    <input type="checkbox"
                           checked={isTitleEdit}
                           onChange={e => setIsTitleEdit(e.currentTarget.checked)}
                    />
                    Edit title
                </label>
            </div>

            <label>
                completed
                <input type="checkbox"
                       disabled={list.length >= 1}
                       checked={completed}
                       onChange={e => setCompleted(e.currentTarget.checked)}
                />
            </label>

            {list.length >= 1 && <ToDoList list={list} onListUpdate={e => setList(e)}/>}

            {list.length === 0 && <button onClick={() => makeNestedList()}>Make nestedList</button>}

            <button onClick={() => props.onRemove()}>Remove task</button>
        </li>
    )
});