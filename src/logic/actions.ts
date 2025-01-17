import {Task, Phase, TaskWithKey} from './model';

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

export const setTasksAction = (payload: {tasks: TaskWithKey[]}) => ({
  type: 'SET_TASKS',
  payload,
});

export const toggleHasCompletedOnboardingAction = () => ({
  type: 'TOGGLE_HAS_COMPLETED_ONBOARDING',
});

export const setPhaseAction = (payload: {phase: Phase}) => ({
  type: 'SET_PHASE',
  payload,
});
