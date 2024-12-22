import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import HorseRacing from '../views/Home.vue';
import { createStore } from 'vuex';

const mockStore = createStore({
  state: {
    racing: {
      horses: [
        { name: 'Horse 1', condition: 70, color: '#ff0000' },
        { name: 'Horse 2', condition: 80, color: '#00ff00' },
        { name: 'Horse 3', condition: 60, color: '#0000ff' },
      ],
      rounds: [],
      currentRoundIndex: 0,
      distances: [1200, 1500],
      racingHorseCount: 3,
    },
  },
  actions: {
    'racing/fetchRounds': vi.fn(),
    'racing/incrementCurrentRoundIndex': vi.fn(),
    'racing/resetRace': vi.fn(),
  },
});

describe('HorseRacing.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(HorseRacing, {
      global: {
        plugins: [mockStore],
      },
      data() {
        return {
          isRacing: false,
          isFirstRace: true,
        };
      },
    });
  });

  it('renders the header and buttons', () => {
    expect(wrapper.find('.horse-racing__header').exists()).toBe(true);
    expect(wrapper.find('.brand').text()).toBe('Horse Racing');
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].text()).toBe('GENERATE PROGRAM');
    expect(buttons[1].text()).toBe('START');
  });

  it('renders horses in the current round', async () => {
    const mockHorses = [
      { name: 'Horse 1', condition: 70, color: '#ff0000', location: 0 },
      { name: 'Horse 2', condition: 80, color: '#00ff00', location: 0 },
    ];
    mockStore.state.racing.rounds = [
      { id: 1, distance: 1200, horses: mockHorses, result: null },
    ];
    await wrapper.vm.$nextTick();

    const lanes = wrapper.findAll('.runway__lane');
    expect(lanes.length).toBe(mockHorses.length);
    expect(lanes[0].find('.lane-number').text()).toBe('1');
    expect(lanes[1].find('.lane-number').text()).toBe('2');
  });

  it('displays the current round correctly', async () => {
    mockStore.state.racing.currentRoundIndex = 0;
    mockStore.state.racing.rounds = [
      { id: 1, distance: 1200, horses: [], result: null },
    ];
    await wrapper.vm.$nextTick();

    const roundInfo = wrapper.find('div[style="margin-top: 8px; color: red;"]');
    expect(roundInfo.text()).toBe('1. Lap 1200m');
  });
});
