import React, {FC, useState} from 'react';
import {ToDoList} from './components/TodoList';
import './App.css';
import {ToDo} from "./components/TodoList/todoTypes";

export const App: FC = () => {
    const [list, setList] = useState<Array<ToDo>>([]);

    return (
        <div className="App">
            <ToDoList list={list} onListUpdate={(e) => setList(e)}/>
        </div>
    );
};