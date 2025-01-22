<template>
  <div>
    <h1>Popis zadataka</h1>
    <!-- Učitavanje podataka -->
    <div v-if="isLoading">Učitavanje zadataka...</div>
    <!-- Prikaz zadataka -->
    <ul v-else>
      <li v-for="task in filteredTasks" :key="task.id">
        <span :style="{ textDecoration: task.status === 'završeno' ? 'line-through' : 'none' }">
          {{ task.title }} ({{ task.status }})
        </span>
        <button @click="updateTaskStatus(task.id, 'na čekanju')">Na čekanju</button>
        <button @click="updateTaskStatus(task.id, 'u tijeku')">U tijeku</button>
        <button @click="updateTaskStatus(task.id, 'završeno')">Završeno</button>
      </li>
    </ul>
    <!-- Gumbi za filtriranje -->
    <div>
      <button @click="filter = 'all'">Svi</button>
      <button @click="filter = 'na čekanju'">Na čekanju</button>
      <button @click="filter = 'u tijeku'">U tijeku</button>
      <button @click="filter = 'završeno'">Završeno</button>
    </div>
    <!-- Forma za dodavanje novog zadatka -->
    <form @submit.prevent="addTask">
      <input v-model="newTaskTitle" placeholder="Unesi naziv zadatka" />
      <select v-model="newTaskStatus">
        <option value="na čekanju">Na čekanju</option>
        <option value="u tijeku">U tijeku</option>
        <option value="završeno">Završeno</option>
      </select>
      <button type="submit">Dodaj Zadatak</button>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "../store/taskStore";

export default {
  name: "TaskList",
  setup() {
    const taskStore = useTaskStore();
    const newTaskTitle = ref(""); // Naslov novog zadatka
    const newTaskStatus = ref("na čekanju"); // Status novog zadatka
    const isLoading = ref(true); // Indikator učitavanja podataka
    const filter = ref("all"); // Filtriranje zadataka (svi, na čekanju, u tijeku, završeno)

    // Dohvat zadataka iz Firestorea
    onMounted(async () => {
      await taskStore.fetchTasks();
      isLoading.value = false;
    });

    // Dodavanje novog zadatka
    const addTask = async () => {
      if (newTaskTitle.value.trim()) {
        await taskStore.addTask({
          title: newTaskTitle.value,
          status: newTaskStatus.value,
        });
        newTaskTitle.value = "";
        newTaskStatus.value = "na čekanju";
      }
    };

    // Ažuriranje statusa zadatka
    const updateTaskStatus = async (taskId, newStatus) => {
      await taskStore.updateTaskStatus(taskId, newStatus);
    };

    // Computed property za filtriranje zadataka
    const filteredTasks = computed(() => {
      if (filter.value === "all") return taskStore.tasks;
      return taskStore.tasks.filter((task) => task.status === filter.value);
    });

    return {
      taskStore,
      newTaskTitle,
      newTaskStatus,
      isLoading,
      addTask,
      updateTaskStatus,
      filteredTasks,
      filter,
    };
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
  margin: 0 5px;
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
