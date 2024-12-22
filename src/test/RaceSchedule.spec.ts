import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import RaceSchedule from '../components/RaceSchedule.vue';
import { createStore } from 'vuex';

const mockStore = createStore({
  state: {
    racing: {
      rounds: [
        {
          distance: 1200,
          horses: [
            { name: 'Horse 1' },
            { name: 'Horse 2' },
            { name: 'Horse 3' },
          ],
        },
      ],
      racingHorseCount: 5,
      distances: [1200, 1500],
    },
  },
});

describe('RaceSchedule.vue', () => {
  let wrapper: ReturnType<typeof shallowMount>;

  beforeEach(() => {
    wrapper = shallowMount(RaceSchedule, {
      global: {
        plugins: [mockStore],
      },
    });
  });

  it('renders the correct number of rounds', () => {
    const roundHeaders = wrapper.findAll('td.td-header');
    expect(roundHeaders.length).toBe(mockStore.state.racing.rounds.length);
  });

  it('renders the correct lap details', () => {
    const roundHeader = wrapper.find('td.td-header');
    expect(roundHeader.text()).toBe(`1. Lap - 1200m`);
  });

  it('renders horses in each round', () => {
    const horseRows = wrapper.findAll('tbody tr');
    const horseCount = mockStore.state.racing.rounds[0].horses.length;
    expect(horseRows.length).toBe(horseCount + 2); // +2 for the header rows
  });

  it('renders fallback distances if no rounds are present', () => {
    mockStore.state.racing.rounds = [];
    wrapper = shallowMount(RaceSchedule, {
      global: {
        plugins: [mockStore],
      },
    });

    const roundHeaders = wrapper.findAll('td.td-header');
    expect(roundHeaders.length).toBe(mockStore.state.racing.distances.length);
    expect(roundHeaders[0].text()).toBe(`1. Lap - 1200m`);
  });
});
