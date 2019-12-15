import {Task} from './model';

export const addTaskAction = (payload: {task: Task}) => ({
  type: 'ADD_TASK',
  payload,
});
export const removeTaskAction = (payload: {index: number}) => ({
  type: 'REMOVE_TASK',
  payload,
});

export const setTaskTextAction = (payload: {text: string; index: number}) => ({
  type: 'SET_TASK_TEXT',
  payload,
});

export const reorderTaskAction = (payload: {
  fromIndex: number;
  toIndex: number;
}) => ({
  type: 'REORDER_TASK',
  payload,
});

export const toggleTaskStateAction = (payload: {index: number}) => ({
  type: 'TOGGLE_TASK_STATE',
  payload,
});

export const setTasksAction = (payload: {tasks: Task[]}) => ({
  type: 'SET_TASKS',
  payload,
});
