export interface AppState {
  hasCompletedOnBoarding: boolean;
  phase: Phase;
  tasks: Task[];
}

export enum Phase {
  write = 'WRITE',
  prioritize = 'PRIORITIZE',
  do = 'DO',
}
export interface Task {
  text: string;
  isDone: boolean;
}
