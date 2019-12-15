export interface AppState {
  hasCompletedOnBoarding: boolean;
  tasks: Task[];
}

export interface Task {
  text: string;
  isDone: boolean;
}
