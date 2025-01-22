<template>
  <div>
    <h1>Popis zadataka</h1>
    <!-- Učitavanje podataka -->
    <div v-if="isLoading">Učitavanje zadataka...</div>
    <!-- Prikaz zadataka -->
    <ul v-else>
      <li v-for="task in taskStore.tasks" :key="task.id">
        <span :style="{ textDecoration: task.status === 'završeno' ? 'line-through' : 'none' }">
          {{ task.title }} ({{ task.status }})
        </span>
        <button @click="updateTaskStatus(task.id, 'na čekanju')">Na čekanju</button>
        <button @click="updateTaskStatus(task.id, 'u tijeku')">U tijeku</button>
        <button @click="updateTaskStatus(task.id, 'završeno')">Završeno</button>
      </li>
    </ul>
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
import { ref, onMounted } from "vue";
import { useTaskStore } from "../store/taskStore";

export default {
  name: "TaskList",
  setup() {
    const taskStore = useTaskStore();
    const newTaskTitle = ref(""); // Naslov novog zadatka
    const newTaskStatus = ref("na čekanju"); // Status novog zadatka
    const isLoading = ref(true); // Indikator učitavanja podataka

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

    return {
      taskStore,
      newTaskTitle,
      newTaskStatus,
      isLoading,
      addTask,
      updateTaskStatus,
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
