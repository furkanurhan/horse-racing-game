<template>
  <div class="race-schedule">
    <h2 class="title">Program</h2>
    <div class="table-responsive">
      <table>
        <tbody>
          <template v-if="rounds?.length > 0" v-for="(round, rI) in rounds" :key="`race-${rI}`">
            <tr>
              <td :colspan="2" class="td-header">{{ `${rI + 1}. Lap - ${round.distance}m` }}</td>
            </tr>
            <tr>
              <td class="table--th">Lane</td>
              <td class="table--th">Name</td>
            </tr>
            <template v-for="(horse, hI) in round.horses" :key="`horse-${hI}`">
              <tr>
                <td>{{ hI + 1 }}</td>
                <td>{{ horse.name }}</td>
              </tr>
            </template>
          </template>
          <template v-else v-for="(distance, rI) in distances" :key="`race2-${rI}`">
            <tr>
              <td :colspan="2" class="td-header">{{ `${rI + 1}. Lap - ${distance}m` }}</td>
            </tr>
            <tr>
              <td class="table--th">Lane</td>
              <td class="table--th">Name</td>
            </tr>
            <template v-for="position in racingHorseCount" :key="position">
              <tr>
                <td>{{ position }}</td>
                <td>#</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const rounds = computed(() => store.state.racing.rounds);
const racingHorseCount = computed(() => store.state.racing.racingHorseCount);
const distances = computed(() => store.state.racing.distances);

</script>

<style scoped>
.race-schedule {
  .title {
    background-color: #255eb5;
  }
  table {
    .td-header {
      background-color: #db4a4a;
      color: white;
    }
  }
}
</style>
