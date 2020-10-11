export type ToDo = {
    title: string,
    completed: boolean,
    id: number,
    list: Array<ToDo>,
};

export type ToDoProps = ToDo & {
    onRemove: () => void;
    onUpdate: (data: ToDoData) => void;
    order: number,
    listName: string,
}

export type ToDoListProps = {
    list: Array<ToDo>;
    onListUpdate: (list: Array<ToDo>) => void;
    className?: string;
    onRemoveNestedList?: () => void;
}

export type ToDoData = {
    title: string,
    completed: boolean,
    list: Array<ToDo>,
}
