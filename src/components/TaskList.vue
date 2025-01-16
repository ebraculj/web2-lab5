<template>
  <div class="task-list">
    <h2>Popis zadataka: (Ukupno: {{ tasks.length }})</h2>

    <form @submit.prevent="addTask">
      <input
        type="text"
        v-model="newTaskTitle"
        placeholder="Unesi novi zadatak"
        required
      />
      <select v-model="newTaskStatus">
        <option value="na čekanju">Na čekanju</option>
        <option value="u tijeku">U tijeku</option>
        <option value="završeno">Završeno</option>
      </select>
      <button type="submit">Dodaj zadatak</button>
    </form>

    <!-- Filter Options -->
    <div>
      <label>
        <input
          type="radio"
          value="sve"
          v-model="filter"
        />
        Sve
      </label>
      <label>
        <input
          type="radio"
          value="na čekanju"
          v-model="filter"
        />
        Na čekanju
      </label>
      <label>
        <input
          type="radio"
          value="u tijeku"
          v-model="filter"
        />
        U tijeku
      </label>
      <label>
        <input
          type="radio"
          value="završeno"
          v-model="filter"
        />
        Završeno
      </label>
    </div>

    <ul>
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-status="toggleTaskStatus"
      />
    </ul>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  name: 'TaskList',
  components: {
    TaskItem,
  },
  data() {
    return {
      tasks: [
        { id: 1, title: 'Predati projekt', status: 'na čekanju' },
        { id: 2, title: 'Izraditi prezentaciju', status: 'u tijeku' },
        { id: 3, title: 'Odnijeti odijelo na kemijsko čišćenje', status: 'završeno' },
      ],
      newTaskTitle: '',
      newTaskStatus: 'na čekanju',
      filter: 'sve', // Filter status
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === 'sve') {
        return this.tasks;
      }
      return this.tasks.filter((task) => task.status === this.filter);
    },
  },
  methods: {
    addTask() {
      const newTask = {
        id: this.tasks.length + 1,
        title: this.newTaskTitle,
        status: this.newTaskStatus,
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
      this.newTaskStatus = 'na čekanju';
    },
    toggleTaskStatus(taskId) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status =
          task.status === 'na čekanju'
            ? 'u tijeku'
            : task.status === 'u tijeku'
            ? 'završeno'
            : 'na čekanju';
      }
    },
  },
};
</script>
