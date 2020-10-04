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
    const [isListCreated, setIsListCreated] = useState<boolean>(false);

    useEffect(() => {
        props.onListUpdate?.(list);
    }, [list]);

    const createToDoList = (): void => {
        if (title) {
            setIsListCreated(true);
        }
    };

    const startEditToDoList = (): void => {
        setIsListCreated(false);
    };

    const removeTodo = (index: number): void => {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
    };

    const addToDo = (): void => {
        setList([...list, {title: '', completed: false, id: generateId(list), list: []}]);
    };

    const onUpdate = (index: number, data: ToDoData) => {
        const newList = [...list];
        newList[index] = {...newList[index], ...data};
        setList(newList);
    };

    return (
        <div>
            <Grid className={css.list} container spacing={1}>
                {isListCreated ?
                    <Grid container justify={'flex-start'} alignItems={'center'} direction={'row'}>
                        <h1 style={{marginRight: '10px'}}>{title}</h1>

                        <Button onClick={() => startEditToDoList()}
                                variant="outlined"
                                color={'primary'}
                                size={"small"}>
                            Edit title
                        </Button>
                    </Grid>
                    :
                    <Grid container spacing={2} item xs={6} alignItems={'center'} justify={'flex-start'} direction={'row'}>
                        <TextField id="outlined-basic"
                                   label="Name of list"
                                   variant="outlined"
                                   style={{maxWidth: '100%', marginRight: '10px'}}
                                   value={title}
                                   onChange={e => setTitle(e.currentTarget.value)}/>

                        {title &&
                        <Button variant={"outlined"}
                                color={'primary'}
                                size={"large"}
                                style={{maxWidth: '100%', height: '100%'}}
                                onClick={() => createToDoList()}>
                            Confirm
                        </Button>
                        }
                    </Grid>
                }
            </Grid>

            {isListCreated &&
            <>
                <Button onClick={() => addToDo()} variant={"outlined"} color={'primary'} size={"small"}>Add task</Button>

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
        </div>
    )
});


