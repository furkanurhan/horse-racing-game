import { Round, Horse, State } from '../../types/racing';

const state: State = {
  horses: [],
  rounds: [],
  currentRoundIndex: 0,
  distances: [1200, 1400, 1600, 1800, 2000, 2200],
  horseCount: 20,
  racingHorseCount: 10
};

const mutations = {
  incrementCurrentRoundIndex(state: State) {
    state.currentRoundIndex++;
  },
  resetRace(state: State) {
    state.currentRoundIndex = 0;
    state.rounds = state.rounds.map(round => {
      return {
        ...round,
        result: null,
        horses: round.horses.map(horse => {
          return {
            ...horse,
            location: 0
          }
        })
      }
    })
  },
  setHorses(state: State, horses: Horse[]) {
    state.horses = horses;
  },
  setRounds(state: State, rounds: Round[]) {
    state.rounds = rounds;
  }
};

const actions = {
  incrementCurrentRoundIndex({ commit }: any) {
    commit('incrementCurrentRoundIndex');
  },
  resetRace({ commit }: any) {
    commit('resetRace');
  },
  fetchHorses({ commit }: any, horses: Horse[]) {
    commit('setHorses', horses);
  },
  fetchRounds({ commit }: any, round: Round[]) {
    commit('setRounds', round);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
