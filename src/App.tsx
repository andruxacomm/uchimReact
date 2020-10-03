import React, {FC} from 'react';
import {ToDoList} from './components/TodoList';
import './App.css';

export const App: FC = () => {
  return (
    <div className="App">
      <ToDoList/>
    </div>
  );
};