export interface AppState {
  hasCompletedOnBoarding: boolean;
  phase: Phase;
  tasks: TaskWithKey[];
}

export enum Phase {
  write = 'WRITE',
  prioritize = 'PRIORITIZE',
  do = 'DO',
}
export interface TaskWithKey {
  text: string;
  isDone: boolean;
  key: number;
}

export interface Task {
  text: string;
  isDone: boolean;
}
