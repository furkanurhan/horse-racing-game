// types.ts

export interface Horse {
  id: number;
  name: string;
  condition: number;
  location?: any;
  color: string;
}

export interface Round {
  id: number;
  distance: number;
  horses: Horse[];
  result?: Round | null;
}

export interface State {
  horses: Horse[];
  rounds: Round[];
  currentRoundIndex: number;
  distances: number[];
  horseCount: number;
  racingHorseCount: number;
}