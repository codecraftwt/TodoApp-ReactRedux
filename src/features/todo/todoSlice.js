
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
    tasks: [{ id: uuid(), title: "Monday GYM", description: "Chest,Shoulders" },
    { id: uuid(), title: "Practice DSA", description: "Arrays,Strings,LinkedList" },
    ],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.tasks.unshift(action.payload);
        },
        toggleCompleted: (state, action) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload);
            if (taskIndex !== -1) {
                const completedTask = state.tasks.splice(taskIndex, 1)[0];
                completedTask.completed = !completedTask.completed;
                state.tasks.push(completedTask);
            }
        },
        deleteTodo: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        updateTodo: (state, action) => {
            const { id, title, description } = action.payload;
            const taskToUpdate = state.tasks.find(task => task.id === id);
            if (taskToUpdate) {
                taskToUpdate.title = title;
                taskToUpdate.description = description;
            }
        },
    },
});

export const { addTodo, toggleCompleted, deleteTodo, updateTodo } = todoSlice.actions;


export default todoSlice.reducer;
