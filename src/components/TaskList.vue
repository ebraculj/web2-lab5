<template>
  <div class="task-list-container">
    <h1>Popis zadataka</h1>

    <div v-if="isLoading" class="loading-text">Učitavanje zadataka...</div>

    <ul v-else class="task-list">
      <li v-for="task in filteredTasks" :key="task.id" class="task-item">
        <span
          :style="{ textDecoration: task.status === 'završeno' ? 'line-through' : 'none' }"
        >
          {{ task.title }} ({{ task.status }})
        </span>
        <div class="button-group">
          <button @click="updateTaskStatus(task.id, 'na čekanju')">
            Na čekanju
          </button>
          <button @click="updateTaskStatus(task.id, 'u tijeku')">
            U tijeku
          </button>
          <button @click="updateTaskStatus(task.id, 'završeno')">
            Završeno
          </button>
        </div>
      </li>
    </ul>

    <div class="filter-buttons">
      <button @click="filter = 'all'">Svi</button>
      <button @click="filter = 'na čekanju'">Na čekanju</button>
      <button @click="filter = 'u tijeku'">U tijeku</button>
      <button @click="filter = 'završeno'">Završeno</button>
    </div>

    <form @submit.prevent="addTask" class="add-task-form">
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
    const newTaskTitle = ref("");
    const newTaskStatus = ref("na čekanju");
    const isLoading = ref(true);
    const filter = ref("all");

    onMounted(async () => {
      await taskStore.fetchTasks();
      isLoading.value = false;
    });

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

    const updateTaskStatus = async (taskId, newStatus) => {
      await taskStore.updateTaskStatus(taskId, newStatus);
    };

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

.task-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #2c3e50;
}

h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.loading-text {
  font-size: 18px;
  color: #7f8c8d;
}

.task-list {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.button-group {
  display: flex;
  gap: 5px;
}

button {
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #2980b9;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.add-task-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
}

.add-task-form input,
.add-task-form select,
.add-task-form button {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-task-form button {
  background-color: #2ecc71;
  color: white;
  cursor: pointer;
}

.add-task-form button:hover {
  background-color: #27ae60;
}
</style>
