import React, {FC, memo, useEffect, useState} from 'react';
import {ToDo, ToDoListProps, ToDoData} from "./todoTypes";
import {ToDoItem} from "./ToDoItem";
import {Button, TextField} from "@material-ui/core";
import css from './ToDo.module.scss';
import {generateId} from "../../helpers/listHelpers";
import {useToDoPercentage} from "./useToDoPercentage";

export const ToDoList: FC<ToDoListProps> = memo((props) => {
    const [list, setList] = useState<Array<ToDo>>(props.list);
    const [title, setTitle] = useState<string>('');
    const [isListCreated, setIsListCreated] = useState<boolean>(false);

    useEffect(() => {
        props.onListUpdate?.(list);
        // eslint-disable-next-line
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

    const getCompletedPercentage = useToDoPercentage(list);

    return (
        <div className={`${css.list} ${props.className}`}>
            <div style={{position: 'relative'}}>
                {`${getCompletedPercentage}%`}

                <div className={`${!isListCreated ? css.dNone : ''} ${css.container}`}>
                    <h1 className={css.mr10}>
                        {title}
                    </h1>

                    <Button onClick={() => startEditToDoList()}
                            variant="outlined"
                            color={'primary'}
                            classes={{root: css.mr10}}
                            size={"small"}>
                        Edit title
                    </Button>

                    <Button onClick={() => addToDo()}
                            variant={"outlined"}
                            color={'primary'}
                            size={"small"}
                            classes={{root: `${css.mr10} ${!isListCreated ? css.dNone : ''}`}}
                    >
                        Add task
                    </Button>
                </div>

                <div className={`${isListCreated ? css.dNone : ''} ${css.container}`}>
                    <TextField id="outlined-basic"
                               label="Name of list"
                               variant="outlined"
                               value={title}
                               classes={{root: css.mr10}}
                               onChange={e => setTitle(e.currentTarget.value)}/>

                    <Button variant={"outlined"}
                            color={'primary'}
                            size={"large"}
                            classes={{root: `${!title ? css.dNone : ''} ${props.onRemoveNestedList ? css.mr10 : ''}`}}
                            onClick={() => createToDoList()}>
                        Confirm
                    </Button>

                    {props.onRemoveNestedList &&
                    <Button variant={"outlined"}
                            color={'primary'}
                            onClick={() => props.onRemoveNestedList?.()}
                            size={"large"}>
                        Remove List
                    </Button>
                    }
                </div>
            </div>

            <ul className={`${list.length > 0 && css.list} ${!isListCreated ? css.dNone : ''}`}>
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
        </div>
    )
});


