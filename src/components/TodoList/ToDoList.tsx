import React, {FC, memo, useEffect, useState} from 'react';
import {ToDo, ToDoListProps} from "./todoTypes";
import {ToDoItem} from "./ToDoItem";

export const generateId = (array: Array<ToDo>): number => {
    return parseInt(`${array.length}${Date.now()}`);
};

export const ToDoList: FC<ToDoListProps> = memo((props) => {
    const [list, setList] = useState<Array<ToDo>>(props.list || []);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        if (typeof props.onListUpdate === 'function') {
            props.onListUpdate(list);
        }
    }, [list]);

    const removeTodo = (index: number): void => {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
    };

    const addToDo = (): void => {
        setList([...list, {title: '', completed: false, id: generateId(list), list: []}]);
    };

    const onUpdate = (index: number, data: ToDo) => {
        setList(list.map((toDo, ind) => ({
            ...toDo,
            completed: ind === index ? data.completed : toDo.completed,
            title: ind === index ? data.title : toDo.title,
            list: ind === index ? data.list : toDo.list,
        })))
    };

    return (
        <div className="todoList">
            <label>Name of list
                <input type="text"
                       value={title}
                       onChange={e => setTitle(e.currentTarget.value)}/>
            </label>

            {title &&
            <>
                <button onClick={() => addToDo()}>Add task</button>

                <ul>
                    {list.map((toDo, index) => (
                        <ToDoItem key={toDo.id}
                                  {...toDo}
                                  listName={title}
                                  order={index}
                                  onRemove={() => removeTodo(index)}
                                  onUpdate={e => onUpdate(index, e)}
                        />
                    ))}
                </ul>
            </>
            }
        </div>
    )
});

