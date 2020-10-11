import {useMemo} from "react";
import {ToDo} from "./todoTypes";

export const useToDoPercentage = (list: Array<ToDo>): number => {
    return useMemo((): number => {
        const itemsCount = list.length;
        const completedItemsCount = list.filter(item => item.completed).length;
        const completedPercentage = (completedItemsCount * 100) / itemsCount;

        return [NaN, Infinity].includes(completedPercentage) ? 0 : Math.round(completedPercentage);
    }, [list]);
};