import React, {FC, memo, useEffect, useState} from 'react';
import {ToDo, ToDoListProps, ToDoData} from "./todoTypes";
import {ToDoItem} from "./ToDoItem";
import {Button, TextField, Grid} from "@material-ui/core";
import css from './ToDo.module.scss';

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

    const onUpdate = (index: number, data: ToDoData) => {
        setList(list.map((toDo, ind) => ind === index ? {...toDo, ...data} : toDo))
    };

    return (
        <Grid className={css.list} container spacing={2}>
            <Grid spacing={2}>
                <TextField id="outlined-basic"
                           label="Name of list"
                           variant="outlined"
                           value={title}
                           onChange={e => setTitle(e.currentTarget.value)}/>

                <Button onClick={() => addToDo()} variant={"outlined"} color={'primary'} size={"small"}>Add task</Button>
            </Grid>

            {title &&
            <>
                <ul className={css.ul}>
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
        </Grid>
    )
});


