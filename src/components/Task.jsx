import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addTodo, updateTodo, toggleCompleted, deleteTodo } from '../features/todo/todoSlice';

const Task = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.todo.tasks);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editedTaskTitle, setEditedTaskTitle] = useState('');
    const [editedTaskDescription, setEditedTaskDescription] = useState('');
    const [titleError, setTitleError] = useState('');

    const handleAddTodo = () => {
        if (newTaskTitle.trim() !== '') {
            dispatch(addTodo({
                id: uuid(),
                title: newTaskTitle,
                description: newTaskDescription,
                completed: false
            }));
            setNewTaskTitle('');
            setNewTaskDescription('');
            setTitleError('');
        } else {
            setTitleError('Title is required');
        }
    };

    const handleToggleCompleted = (taskId) => {
        dispatch(toggleCompleted(taskId));
    };

    const handleDeleteTodo = (taskId) => {
        dispatch(deleteTodo(taskId));
    };

    const handleUpdateTask = (taskId) => {
        if (editedTaskTitle.trim() !== '') {
            dispatch(updateTodo({
                id: taskId,
                title: editedTaskTitle,
                description: editedTaskDescription,
            }));
            setEditTaskId(null);
            setEditedTaskTitle('');
            setEditedTaskDescription('');
            setTitleError('');
        } else {
            setTitleError('Title is required');
        }
    };

    const handleEditTask = (taskId, title, description) => {
        setEditTaskId(taskId);
        setEditedTaskTitle(title);
        setEditedTaskDescription(description);
    };

    return (
        <div className="w-[50%] mx-auto my-10 px-4 mo:w-[80%]   ">
            <h1 className="text-3xl font-bold mb-5">Todo App</h1>

            <div className="mb-5">
                <input
                    type="text"
                    placeholder="Enter title..."
                    value={newTaskTitle}
                    onChange={(e) => {
                        setNewTaskTitle(e.target.value);
                        setTitleError('');
                    }}
                    className="border border-gray-300 rounded-md py-2 px-4 w-full mb-2"
                    required
                />
                {titleError && <p className="text-red-500">{titleError}</p>}
                <textarea
                    placeholder="Enter description..."
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 w-full h-20 mb-2"
                />
                <button onClick={handleAddTodo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Add Task</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="border-b border-gray-300 py-2">
                        <div className="flex items-center justify-between mo:flex-col mo:justify-start mo:items-start">
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleCompleted(task.id)}
                                    className="mr-2"
                                />
                                <div>
                                    <p className={`font-bold ${task.completed ? 'line-through' : ''}`}>{task.title}</p>
                                    <p className={`text-gray-700 ${task.completed ? 'line-through' : ''}`}>{task.description}</p>
                                </div>
                            </div>
                            <div className="flex mt-2 mo:flex-col ta:flex-col">
                                {editTaskId === task.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedTaskTitle}
                                            onChange={(e) => setEditedTaskTitle(e.target.value)}
                                            className="border border-gray-300 rounded-md  px-2 mr-1 mo:mb-4 mo:px-2 ta:mb-4"
                                        />
                                        {titleError && <p className="text-red-500">{titleError}</p>}
                                        <textarea
                                            value={editedTaskDescription}
                                            onChange={(e) => setEditedTaskDescription(e.target.value)}
                                            className="border border-gray-300 rounded-md  px-2 mr-1 mo:mb-4 mo:px-2 ta:mb-4"
                                        />
                                        <button onClick={() => handleUpdateTask(task.id)} className="bg-green-500 hover:bg-green-700 mr-2 text-white font-bold py-1 px-4 rounded ">Update</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEditTask(task.id, task.title, task.description)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded mr-2 mo:py-1 mo:px-2 mo:text-base">Edit</button>
                                )}
                                {editTaskId !== task.id && <button onClick={() => handleDeleteTodo(task.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mo:mt-1 ta:mt-1 mo:py-1 mo:px-2 mo:text-base">Delete</button>}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Task;
