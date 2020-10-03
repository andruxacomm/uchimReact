export type ToDo = {
    title: string,
    completed: boolean,
    id: number,
    list: Array<ToDo>,
};

export type ToDoProps = ToDo & {
    onRemove: () => void;
    onUpdate: (data:ToDo) => void;
    order: number,
    listName: string,
}

export type ToDoListProps = {
    list?: Array<ToDo>;
    onListUpdate?: (list: Array<ToDo>) => void;
    //parentName?: string;
}
