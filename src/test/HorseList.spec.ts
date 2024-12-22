import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import HorseList from '../components/HorseList.vue';
import { createStore } from 'vuex';

type Horse = {
  id: number;
  name: string;
  condition: number;
  color: string;
};

type RacingState = {
  horses: Horse[];
  horseCount: number;
};

const mockStore = createStore({
  state: {
    racing: {
      horses: [] as Horse[],
      horseCount: 5,
    },
  },
  mutations: {
    setHorses(state: { racing: RacingState }, horses: Horse[]) {
      state.racing.horses = horses;
    },
  },
  actions: {
    'racing/fetchHorses': vi.fn((context, horses: Horse[]) => {
      context.commit('setHorses', horses);
    }),
  },
});

describe('HorseList.vue', () => {
  let wrapper: ReturnType<typeof shallowMount>;

  beforeEach(() => {
    wrapper = shallowMount(HorseList, {
      global: {
        plugins: [mockStore],
      },
    });
  });

  it('renders the correct number of horses', () => {
    const horseRows = wrapper.findAll('tbody tr');
    expect(horseRows.length).toBe(mockStore.state.racing.horseCount);
  });

  it('generates random colors that meet the threshold distance', () => {
    const { generateUniqueDistantColors, isColorDistant } = wrapper.vm as any;
    const colors = generateUniqueDistantColors(5, 25);

    expect(colors.length).toBe(5);

    colors.forEach((color: string, index: number) => {
      for (let j = index + 1; j < colors.length; j++) {
        const isDistant = isColorDistant([color], colors[j], 25);
        expect(isDistant).toBe(true);
      }
    });
  });

  it('assigns unique colors to each horse', () => {
    const horseColors = mockStore.state.racing.horses.map((horse: Horse) => horse.color);
    const uniqueColors = new Set(horseColors);

    expect(uniqueColors.size).toBe(horseColors.length);
  });

  it('properly formats horse data', () => {
    const { generateHorses } = wrapper.vm as any;
    generateHorses();

    const horses = mockStore.state.racing.horses;
    expect(horses.length).toBe(mockStore.state.racing.horseCount);
    horses.forEach((horse: Horse, index: number) => {
      expect(horse.id).toBe(index + 1);
      expect(horse.name).toBe(`At ${index + 1}`);
      expect(horse.condition).toBeGreaterThanOrEqual(1);
      expect(horse.condition).toBeLessThanOrEqual(100);
      expect(horse.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });
});
