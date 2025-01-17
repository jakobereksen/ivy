import {AppState, Phase, TaskWithKey} from './model';

const initialState: AppState = {
  hasCompletedOnBoarding: false,
  tasks: [{text: '', isDone: false, key: 0}],
  phase: Phase.write,
};

const reducer = (state = initialState, action): AppState => {
  switch (action.type) {
    case 'REMOVE_TASK':
      const tasks = [...state.tasks];
      tasks.splice(action.payload.index, 1);

      return {...state, tasks};

    case 'ADD_TASK':
      const nextTask: TaskWithKey = action.payload.task;
      let key = 0;
      while (state.tasks.filter(task => task.key === key).length > 0) {
        key++;
      }
      nextTask.key = key;
      return {...state, tasks: [...state.tasks, nextTask]};

    case 'SET_TASK_TEXT':
      const newTasks2 = [...state.tasks];
      const {index: index2, text} = action.payload;
      newTasks2[index2].text = text;
      return {...state, tasks: newTasks2};

    case 'REORDER_TASK':
      const arr = [...state.tasks];

      const new_index = action.payload.toIndex;
      const old_index = action.payload.fromIndex;
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return {...state, tasks: arr};

    case 'TOGGLE_TASK_STATE':
      const newTasks = [...state.tasks];
      const {index} = action.payload;

      newTasks[index].isDone = !newTasks[index].isDone;
      return {...state, tasks: newTasks};

    case 'SET_TASKS':
      return {...state, tasks: action.payload.tasks};

    case 'TOGGLE_HAS_COMPLETED_ONBOARDING':
      return {...state, hasCompletedOnBoarding: !state.hasCompletedOnBoarding};

    case 'SET_PHASE':
      return {
        ...state,
        phase: action.payload.phase,
      };

    default:
      return state;
  }
};

export default reducer;
