import React, {FC, memo, useEffect, useState} from "react";
import {ToDoProps} from "./todoTypes";
import {ToDoList} from "./ToDoList";
import {Button, TextField, FormControlLabel, Checkbox} from "@material-ui/core";
import css from './ToDo.module.scss';
import {generateId} from "../../helpers/listHelpers";

export const ToDoItem: FC<ToDoProps> = memo((props) => {
    const [title, setTitle] = useState(props.title);
    const [completed, setCompleted] = useState(props.completed);
    const [list, setList] = useState(props.list);
    const [isTitleEdit, setIsTitleEdit] = useState(true);
    const [isControlsShow, setIsControlShow] = useState(false);
    const {order, listName, onUpdate} = props;

    useEffect((): void => {
        onUpdate({list, title, completed});
        // eslint-disable-next-line
    }, [completed, list, isTitleEdit]);

    const makeNestedList = (): void => {
        if (list.length === 0) {
            setList([...list, {title: title, completed: false, id: generateId(list), list: []}]);
        }
    };

    const disableNestedList = (): void => {
        setList([]);
    };

    return (
        <li className={css.toDoItem}>
            <div className={css.textContainer}>
                <div className={css.container}>
                    <FormControlLabel
                        classes={{root: `${isTitleEdit ? css.dNone : ''}`}}
                        disabled={list.length >= 1}
                        control={<Checkbox checked={completed} onChange={e => setCompleted(e.currentTarget.checked)} name="checkedA" color="primary"/>}
                        label={`${order + 1} Task of "${listName}" list is: "${title}"`}
                    />
                </div>

                <TextField id="outlined-basic"
                           label="Name of list"
                           variant="outlined"
                           value={title}
                           classes={{root: `${!isTitleEdit ? css.dNone : ''}`}}
                           onChange={e => setTitle(e.currentTarget.value)}/>

                <FormControlLabel
                    classes={{root: css.editTitle}}
                    disabled={list.length >= 1}
                    control={<Checkbox checked={isTitleEdit} onChange={e => setIsTitleEdit(e.currentTarget.checked)} name="checkedB" color="secondary"/>}
                    label="Edit title"
                />
            </div>

            <h3 className={`${isTitleEdit ? css.dNone : ''} ${css.pointer}`}
                style={{margin: '10px 0 10px 0', padding: '0', textAlign: 'left'}}
                onClick={() => setIsControlShow(!isControlsShow)}
            >
                Controls
            </h3>

            <div className={`${!isControlsShow ? css.dNone : ''}`}>
                <ToDoList
                    list={list}
                    onListUpdate={e => setList(e)}
                    onRemoveNestedList={() => disableNestedList()}
                    className={`${list.length === 0 ? css.dNone : ''}`}
                />

                <Button
                    variant="outlined"
                    color={'primary'}
                    size={"small"}
                    classes={{root: `${list.length >= 1 ? css.dNone : ''} ${css.mr10}`}}
                    onClick={() => makeNestedList()}>
                    Make nested list
                </Button>

                <Button
                    variant="outlined"
                    color={'primary'}
                    classes={{root: css.mr10}}
                    size={"small"}
                    onClick={() => props.onRemove()}
                >
                    Remove task
                </Button>
            </div>
        </li>
    )
});