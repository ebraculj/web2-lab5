<template>
  <div>
    <h1>Task List</h1>
    <div v-if="tasks.length === 0">Učitavanje zadataka...</div>
    <ul v-else>
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-status="toggleTaskStatus"
      />
    </ul>
    <form @submit.prevent="addTask">
      <input v-model="newTaskTitle" placeholder="Unesi naziv zadatka" />
      <select v-model="newTaskStatus">
        <option value="na čekanju">Na čekanju</option>
        <option value="u tijeku">U tijeku</option>
        <option value="završeno">Završeno</option>
      </select>
      <button type="submit">Dodaj Zadatak</button>
    </form>
    <div>
      <button @click="filter = 'all'">Svi</button>
      <button @click="filter = 'na čekanju'">Na čekanju</button>
      <button @click="filter = 'u tijeku'">U tijeku</button>
      <button @click="filter = 'završeno'">Završeno</button>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  name: "TaskList",
  components: {
    TaskItem,
  },
  data() {
    return {
      tasks: [], // Inicijalna prazna lista zadataka
      newTaskTitle: "",
      newTaskStatus: "na čekanju", // Zadani status
      filter: "all", // Zadani filter
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === "all") return this.tasks;
      return this.tasks.filter((task) => task.status === this.filter);
    },
  },
  methods: {
    addTask() {
      // Dodavanje novog zadatka
      if (this.newTaskTitle.trim() !== "") {
        this.tasks.push({
          id: Date.now(), // Jedinstveni ID
          title: this.newTaskTitle,
          status: this.newTaskStatus,
        });
        this.newTaskTitle = ""; // Reset inputa
        this.newTaskStatus = "na čekanju"; // Reset statusa
      }
    },
    toggleTaskStatus(taskId) {
      // Promjena statusa zadatka
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        if (task.status === "na čekanju") {
          task.status = "u tijeku";
        } else if (task.status === "u tijeku") {
          task.status = "završeno";
        } else {
          task.status = "na čekanju";
        }
      }
    },
  },
  mounted() {
    // Mock dohvat podataka nakon 1 sekunde
    setTimeout(() => {
      this.tasks = [
        { id: 1, title: "Predati projekt", status: "na čekanju" },
        { id: 2, title: "Obnoviti putovnicu", status: "u tijeku" },
        { id: 3, title: "Odnijeti odijelo na kemijsko čišćenje", status: "završeno" },
      ];
    }, 1000);
  },
};
</script>

<style scoped>
h1 {
  color: #2c3e50;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

form {
  margin-top: 20px;
}
</style>
