<template>
  <div>
    <h1>Task List</h1>
    <div v-if="isLoading">Učitavanje zadataka...</div>
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
import { computed, ref } from "vue";
import { useTaskStore } from "@/store/taskStore";
import TaskItem from "./TaskItem.vue";

export default {
  name: "TaskList",
  components: {
    TaskItem,
  },
  setup() {
    const taskStore = useTaskStore();
    const newTaskTitle = ref("");
    const newTaskStatus = ref("na čekanju");
    const filter = ref("all");
    const isLoading = ref(true);

    // Dohvati zadatke kad se komponenta montira
    taskStore.fetchTasks().finally(() => {
      isLoading.value = false;
    });

    // Filtrirani zadaci
    const filteredTasks = computed(() => {
      if (filter.value === "all") return taskStore.tasks;
      return taskStore.tasks.filter((task) => task.status === filter.value);
    });

    // Dodaj novi zadatak
    const addTask = () => {
      if (newTaskTitle.value.trim() !== "") {
        const task = {
          id: Date.now(),
          title: newTaskTitle.value,
          status: newTaskStatus.value,
        };
        taskStore.addTask(task);
        newTaskTitle.value = "";
        newTaskStatus.value = "na čekanju";
      }
    };

    // Promjena statusa zadatka
    const toggleTaskStatus = (taskId) => {
      taskStore.toggleTaskStatus(taskId);
    };

    return {
      newTaskTitle,
      newTaskStatus,
      filter,
      isLoading,
      filteredTasks,
      addTask,
      toggleTaskStatus,
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
