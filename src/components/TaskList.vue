<template>
  <div>
    <h1>Popis zadataka</h1>
    <!-- Prikaz zadataka ili poruka o učitavanju -->
    <div v-if="tasks.length === 0">Učitavanje zadataka...</div>
    <ul v-else>
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle-status="toggleTaskStatus"
      />
    </ul>
    <!-- Forma za unos novog zadatka -->
    <form @submit.prevent="addTask">
      <input v-model="newTaskTitle" placeholder="Unesi naziv zadatka" />
      <select v-model="newTaskStatus">
        <option value="na čekanju">Na čekanju</option>
        <option value="u tijeku">U tijeku</option>
        <option value="završeno">Završeno</option>
      </select>
      <button type="submit">Dodaj Zadatak</button>
    </form>
    <!-- Gumbi za filtriranje -->
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
import { useTaskStore } from "../store/taskStore";

export default {
  name: "TaskList",
  components: { TaskItem },
  data() {
    return {
      newTaskTitle: "",
      newTaskStatus: "na čekanju",
      filter: "all",
    };
  },
  computed: {
    // Dohvaćanje zadataka iz store-a
    tasks() {
      return this.taskStore.tasks;
    },
    filteredTasks() {
      if (this.filter === "all") return this.tasks;
      return this.tasks.filter((task) => task.status === this.filter);
    },
  },
  methods: {
    addTask() {
      if (this.newTaskTitle.trim() !== "") {
        this.taskStore.addTask({
          id: Date.now(),
          title: this.newTaskTitle,
          status: this.newTaskStatus,
        });
        this.newTaskTitle = "";
        this.newTaskStatus = "na čekanju";
      }
    },
    toggleTaskStatus(taskId) {
      this.taskStore.toggleTaskStatus(taskId);
    },
  },
  async mounted() {
    await this.taskStore.fetchTasks(); // Dohvati zadatke pri mountanju komponente
  },
  created() {
    this.taskStore = useTaskStore(); // Inicijalizacija Pinia store-a
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
